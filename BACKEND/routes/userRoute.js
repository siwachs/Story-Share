import express from "express";
import {
  authUser,
  getAllUsers,
  registerUser,
} from "../controllers/userController.js";

//File Upload
import { fileUpload } from "../middleware/fileUpload.js";

const router = express.Router();

//@desc   Get all Users
//@route  Get /api/users
//@access Public
router.route("/").get(getAllUsers);

//@desc   Register a user
//@route  post /api/users
//@access Public
router.route("/register").post(fileUpload.single("image"), registerUser);

//@desc   Login a user
//@route  post /api/users/login
//@access Public
router.route("/login").post(authUser);

export default router;
