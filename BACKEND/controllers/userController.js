import expressAsyncHandler from "express-async-handler";
import fs from "fs";
import upath from "upath";
import { generateWebToken } from "../config/generateWebToken.js";

import User from "../dataModels/userModel.js";

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      image: user.image,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, role } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    //Rollback if we get a error
    if (req.file) {
      fs.unlink(req.file.path, (error) => {
        console.log("File Deleted");
      });
    }
    res.status(400);
    throw new Error("User already Exist");
  }

  const path = upath.toUnix(req.file.path);

  const user = await User.create({
    image: "http://localhost:5000/" + path,
    name,
    email,
    password,
    isAdmin,
    role,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      image: user.image,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token: generateWebToken(user._id),
    });
  } else {
    if (req.file) {
      fs.unlink(req.file.path, (error) => {
        console.log("File Deleted");
      });
    }
    res.status(400);
    throw new Error("Invalid User Data");
  }
});
