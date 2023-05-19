import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import { WriteModel } from "../models/Write.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await WriteModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/articles");
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
}).single("storyImage");

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

router.post("/", verifyToken, upload, async (req, res) => {
  try {
    const write = new WriteModel({
      title: req.body.title,
      storyBody: req.body.storyBody,
      category: req.body.category,
      userOwner: req.body.userOwner,
    });
    // The uploaded file should now be available in req.file
    if (req.file) {
      write.storyImage = req.file.filename;
    }
    // Apply category filter
    const category = req.body.category; // The category value from the request body
    let filteredStories = [];
    if (category) {
      filteredStories = await WriteModel.find({
        category: category,
      });
    }

    const savedStories = await write.save();

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.body.userOwner },
      { $push: { savedStories: savedStories._id } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
});

router.get("/published/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedStories: user?.savedStories });
  } catch (err) {
    res.json(err);
  }
});

export { router as writeRouter };
