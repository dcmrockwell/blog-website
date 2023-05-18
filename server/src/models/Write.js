import mongoose from "mongoose";

const WriteSchema = new mongoose.Schema({
  title: { type: String, required: false },
  storyBody: { type: String, required: true },
  category: [{ type: String, required: true }],
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  storyImage: { type: String, required: false },
});

export const WriteModel = mongoose.model("write", WriteSchema);
