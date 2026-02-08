import { Request, Response } from "express";
import { postService } from "./post.service";
import { Post } from "../../../generated/prisma/client";


const createPost = async (req: Request, res: Response) => {

  try {
    const user = req.user;

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
export const PostController = {
  createPost
}