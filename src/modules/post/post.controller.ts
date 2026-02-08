import { Request, Response } from "express";
import { postService } from "./post.service";
import { Post } from "../../../generated/prisma/client";


const createPost = async (req: Request, res: Response) => {

  try {
    const user = req.user as any;
    /* const {user} = req; */

    if (!user) {
      return res.status(400).json({
        message: "Unauthorized access"
      })

    }
    /*  console.log(req.user) */
    const result = await postService.createPost(req.body, user.id as string);
    res.status(201).json(result)
  } catch (e) {
    res.status(400).json({
      message: "Failed to post creation",
      details: e
    })
  }
}

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query

    console.log("search value", search)
    const searchString = typeof search === 'string' ? search : undefined
    const tags =req.query.tags ? (req.query.tags as string).split(",") : [];

    const result = await postService.getAllPost({search: searchString, tags});
    res.status(200).json(result)
  }
  catch (e) {
    res.status(400).json({
      message: "Failed to get all posts",
      details: e
    })
  }
}
export const PostController = {
  createPost,
  getAllPost
}