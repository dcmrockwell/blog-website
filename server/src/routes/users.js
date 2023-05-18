import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists, please log in" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    createdAt: new Date(),
  });
  await newUser.save();

  res.json({
    message: "User Registered Successfully!",
  });
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
  console.log("Token: ", token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
