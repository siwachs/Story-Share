import express from "express";
import {
  createStory,
  getStoriesByUid,
  getStoryById,
  deleteStoryById,
  updateStoryById,
} from "../controllers/storyController.js";
import { fileUpload } from "../middleware/fileUpload.js";

const router = express.Router();

router.route("/").post(fileUpload.single("image"), createStory);

router.route("/:uid").get(getStoriesByUid);

router.route("/story/:sid").get(getStoryById);

router.route("/:sid").delete(deleteStoryById);

router.route("/:sid").patch(updateStoryById);

export default router;
