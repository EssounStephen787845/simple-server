import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Usermodel from "./schema/user_schema.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 7000;
const url = process.env.dbUrl;

//Connection method to DataBase
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    ///if database is connected successful
    console.log("DataBase connected successfully");
  })
  .catch((error) => {
    //if an eror occurs
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/create", async (req, res) => {
  const { first_name, last_name, date_of_birth, school } = req.body;
  const create = await Usermodel.create({
    first_name,
    last_name,
    date_of_birth,
    school,
  });
  if (create) {
    return res.status(201).json({
      message: "Done",
      data: create,
    });
  } else {
    return res.status(204).json({
      message: "Failed to create",
    });
  }
});

//Get all TODO routs
app.get("/user_info", async (req, res) => {
  const User = await Usermodel.find({});
  if (User) {
    res.status(200).json({
      message: "Fetch all users from database",
      data: User,
    });
  } else {
    res.status(400).json({
      message: "Failed to fetch user from database",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
