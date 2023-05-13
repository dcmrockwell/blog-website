import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { profileRouter } from "./routes/profile.js";

dotenv.config();

const app = express();

//MIDDLEWARE CONVERT DATA FROM JSON
app.use(express.json());
//SOLVE ISSUES FOR FRONTEND EXPRESS
app.use(cors());

app.use("/", userRouter);
app.use("/profile", profileRouter);

mongoose.connect(
  `mongodb+srv://alkaseltzer:${process.env.MONGODB_PASSWORD}@bloggingapp.pnmjowy.mongodb.net/bloggingapp?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//STARTING THE API / SERVER
app.listen(3001, () => console.log("SERVER STARTED"));
