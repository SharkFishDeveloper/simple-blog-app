import express from "express";
import { Blog, User } from "../model/model.js";
import {
  authMiddlware,
  readBlogAuthMiddleware,
} from "../middlware/authMiddleware.js";
import mongoose from "mongoose";
const blogRouter = express.Router();

blogRouter.post("/create", authMiddlware, async (req, res) => {
  const user = await User.findById(req.userId);
  const authorName = user.name; //* extract name from user

  if (!user) {
    return res.json({ message: "Invalid login" }).status(400);
  }
  const { title, desc, category } = req.body;
  const checkBlogExists = await Blog.findOne({ title });
  if (checkBlogExists) {
    return res.json({ message: "Choose a unique title !!" }).status(400);
  }
  const newBlog = await new Blog({
    title,
    desc,
    authorName,
    category,
    authorId: req.userId,
  });

  await newBlog.save();
  return res.json({ message: "Blog created successfully !!" }).status(200);
});

blogRouter.post("/read", authMiddlware, async (req, res) => {
  try {
    const { blogId } = req.body;
    //  console.log(blogId, typeof blogId.toString());
    const blog = await Blog.findById(blogId);
    return res.json({ message: blog }).status(200);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error occured while reading blog" });
  }
});

export default blogRouter;
