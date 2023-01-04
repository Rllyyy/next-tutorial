import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "..";
import { comments } from "../../../../data/comments";

// This function handles GET requests to the /api/comments route
export default function handler(req: NextApiRequest, res: NextApiResponse<Comment | Comment[]>) {
  if (req.method === "GET") {
    // Get the commentId query parameter
    const { commentId } = req.query;

    // If commentId is not provided or is an array, return a 400 Bad Request response
    if (!commentId || Array.isArray(commentId)) {
      res.status(400);
      return res.end("Name parameter is required");
    }

    // Find the comment with the matching ID
    const comment = comments.find((comment) => comment.id === parseInt(commentId));

    // If the comment was not found, return a 404 Not Found response
    if (!comment) {
      return res.status(404).end("Comment not found");
    }

    // If the comment was found, return a 200 OK response with the comment data
    res.status(200).json(comment);
    return;
  } else if (req.method === "DELETE") {
    // Get the commentId query parameter
    const { commentId } = req.query;

    // If commentId is not provided or is an array, return a 400 Bad Request response
    if (!commentId || Array.isArray(commentId)) {
      res.status(400);
      return res.end("Name parameter is required");
    }

    // Filter out comment
    //const filteredComments = comments.filter((comment) => comment.id !== parseInt(commentId));
    const index = comments.findIndex((comment) => comment.id === parseInt(commentId));

    comments.splice(index, 1);

    return res.status(201).json(comments);
  }
}
