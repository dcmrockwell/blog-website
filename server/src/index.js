import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
import { profileRouter } from "./routes/profile.js";
import { writeRouter } from "./routes/Write.js";

dotenv.config();

const app = express();

//MIDDLEWARE CONVERT DATA FROM JSON
app.use(express.json());
//SOLVE ISSUES FOR FRONTEND EXPRESS
app.use(cors());

app.use("/", userRouter);
app.use("/profile", profileRouter);
app.use("/write", writeRouter);

mongoose.connect(`${process.env.MONGOOSE_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//STARTING THE API / SERVER
const port = process.env.PORT;
app.listen(3001, () => console.log("SERVER STARTED"));
