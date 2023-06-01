import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  accountName: { type: String, required: false },
  description: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  linkedIn: {
    type: String,
    required: false,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  profileImage: { type: String, required: false },
});

export const ProfileModel = mongoose.model("profiles", ProfileSchema);
