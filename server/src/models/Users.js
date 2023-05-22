import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, "Username must have at least 4 characters."],
    validate: {
      validator: function (value) {
        // Case-sensitive validation
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: "Username must contain only letters and numbers.",
    },
  },
  email: {
    type: String,
    required: false,
    unique: true,
    validate: {
      validator: function (value) {
        // Email validation using regex
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: "Invalid email format.",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must have at least 6 characters."],
    validate: {
      validator: function (value) {
        return /.*[!@#$%^&*()].*/.test(value);
      },
      message: "Password must contain at least one special character.",
    },
  },
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
