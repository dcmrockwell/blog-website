import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  savedProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profiles",
    default: null,
  },
  profileImage: {
    type: String,
    default: null,
    required: false,
  },
  savedStories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles",
      default: null,
    },
  ],
});

export const UserModel = mongoose.model("users", UserSchema);
