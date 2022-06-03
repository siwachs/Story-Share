import mongoose from "mongoose";

const storySchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
    default: "/noImage.svg",
  },
  title: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  uid: {
    type: mongoose.Types.ObjectId,
    req: true,
    ref: "User",
  },
});

const Story = mongoose.model("Story", storySchema);

export default Story;
