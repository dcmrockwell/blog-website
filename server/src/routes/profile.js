import express from "express";
import mongoose from "mongoose";
import { ProfileModel } from "../models/Profile.js";
import { UserModel } from "../models/Users.js";
import multer from "multer";
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

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("profileImage"), async (req, res) => {
  try {
    // Find the existing Profile document and delete it
    const deletedProfile = await ProfileModel.findOneAndDelete({
      userOwner: req.body.userOwner,
    });

    // Create a new Profile document
    const profile = new ProfileModel({
      name: req.body.name,
      description: req.body.description,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      github: req.body.github,
      userOwner: req.body.userOwner,
      profileImage: req.body.profileImage,
    });

    const savedProfile = await profile.save();

    const profileID = savedProfile._id;

    console.log(profileID);

    // Update the User document with the _id of the newly created Profile document
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.body.userOwner },
      { savedProfile: savedProfile._id },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     // Find the existing Profile document and delete it
//     const deletedProfile = await ProfileModel.findOneAndDelete({
//       userOwner: req.body.userOwner,
//     });

//     // Create a new Profile document
//     const profile = new ProfileModel({
//       name: req.body.name,
//       description: req.body.description,
//       facebook: req.body.facebook,
//       twitter: req.body.twitter,
//       github: req.body.github,
//       userOwner: req.body.userOwner,
//     });

//     const savedProfile = await profile.save();

//     const profileID = savedProfile._id;

//     console.log(profileID);

//     // Update the User document with the _id of the newly created Profile document
//     const updatedUser = await UserModel.findOneAndUpdate(
//       { _id: req.body.userOwner },
//       { savedProfile: savedProfile._id },
//       { new: true }
//     );

//     res.json(updatedUser);
//   } catch (err) {
//     res.json(err);
//   }
// });

//shows details of the user
router.get("/:userID", async (req, res) => {
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

export { router as profileRouter };
