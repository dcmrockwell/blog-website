import express from "express";
import mongoose from "mongoose";
import { ProfileModel } from "../models/Profile.js";
import { UserModel } from "../models/Users.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await ProfileModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // set file size limit to 30MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage"); // 'profileImage' is the name attribute of the file input field in the HTML form

// Check file type
function checkFileType(file, cb) {
  // Allowed filetypes
  const filetypes = /jpeg|jpg|png|gif/;

  // Check file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

router.post("/", upload, async (req, res) => {
  try {
    // Find the existing Profile document and delete it
    const deletedProfile = await ProfileModel.findOneAndDelete({
      userOwner: req.body.userOwner,
    });

    // Create a new Profile document
    const profile = new ProfileModel({
      accountName: req.body.accountName,
      description: req.body.description,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      github: req.body.github,
      website: req.body.website,
      linkedIn: req.body.linkedIn,
      userOwner: req.body.userOwner,
    });

    // Set profileImage only if it exists in the request
    if (req.file) {
      profile.profileImage = req.file.filename;
    } else if (deletedProfile && deletedProfile.profileImage) {
      // Use the existing profileImage if no new file is uploaded
      profile.profileImage = deletedProfile.profileImage;
    }

    const savedProfile = await profile.save();

    const profileID = savedProfile._id;

    // Update the User document with the _id of the newly created Profile document
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.body.userOwner },
      { savedProfile: savedProfile._id, profileImage: profile.profileImage },
      { new: true }
    );

    res.json(savedProfile);
  } catch (err) {
    res.json(err);
  }
});

//shows details of the user
router.get("/:userID", upload, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({
      userOwner: req.params.userID,
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.json(err);
  }
});

//fetches the profile picture
router.use("/images", express.static("uploads"));

export { router as profileRouter };
