import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserModel } from "../models/Users.js";

const router = express.Router();
dotenv.config();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ $or: [{ username }, { email }] });

  if (user) {
    return res.json({
      message: "Username or email already exists, please log in",
    });
  }

  const newUser = new UserModel({
    username,
    email,
    password,
    createdAt: new Date(),
  });

  try {
    const errors = newUser.validateSync();
    if (errors) {
      const errorMessage = Object.values(errors.errors)
        .map((error) => error.message)
        .join("\n");
      throw new Error(errorMessage);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    res.json({ message: "User Registered Successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User Doesn't Exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is Incorrect!" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      createdAt: user.createdAt,
      savedProfile: user.savedProfile,
      profileImage: user.profileImage,
    },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    userID: user._id,
    username: user.username,
    createdAt: user.createdAt,
    savedProfile: user.savedProfile,
    profileImage: user.profileImage,
  });
});

export { router as userRouter };

//middleware
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
