import mongoose from "mongoose";
import fs from "fs";
import upath from "upath";
import expressAsyncHandler from "express-async-handler";

import User from "../dataModels/userModel.js";
import Story from "../dataModels/storyModel.js";

export const getStoriesByUid = expressAsyncHandler(async (req, res) => {
  const uid = req.params.uid;

  const stories = await User.findById(uid).populate("stories");

  res.json(stories.stories);
});

export const getStoryById = expressAsyncHandler(async (req, res) => {
  const sid = req.params.sid;
  const story = await Story.findById(sid);

  if (!story) {
    res.status(404);
    throw new Error("Can't able to find story");
  }

  res.json(story);
});

export const createStory = expressAsyncHandler(async (req, res) => {
  const { uid, title, story } = req.body;
  const path = upath.toUnix(req.file.path);

  const user = await User.findById(uid);
  if (!user) {
    res.status(404);
    throw new Error("Can't find User");
  }

  const createdStory = new Story({
    image: "http://localhost:5000/" + path,
    title,
    story,
    uid,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    //Start session for ACID property

    await createdStory.save({ session: session });
    user.stories.push(createdStory);
    //It store document Object ID
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    res.status(500);
    throw new Error("ACID transaction failed");
  }
  res.status(201).json(createdStory);
});

export const updateStoryById = expressAsyncHandler(async (req, res) => {
  const { title, story } = req.body;
  const sid = req.params.sid;
  const _story = await Story.findById(sid);

  _story.title = title;
  _story.story = story;

  try {
    await _story.save();
  } catch (err) {
    res.status(500);
    throw new Error("Can't able to update story");
  }

  res.status(200).json(_story);
});

export const deleteStoryById = expressAsyncHandler(async (req, res) => {
  const sid = req.params.sid;
  let story = await Story.findById(sid).populate("uid");

  if (!story) {
    throw new Error("Can't able to delete this story");
  }

  //Clear FS
  const imagePath = story.image;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await story.remove({ session: session });
    story.uid.stories.pull(story);
    await story.uid.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    res.status(500);
    throw new Error("An Error Occured while delete this file");
  }

  if (imagePath !== "/noImage.svg") {
    fs.unlink(imagePath, (err) => {
      console.log("Could not able to clean FS" + err);
    });
  }

  res.status(200).json({ message: "Deleted" });
});
