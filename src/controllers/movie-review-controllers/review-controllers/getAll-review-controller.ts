import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/movie-review-services/review-services";

export async function getAllReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reviews = await reviewServices.getAllReviews();

  res.json({
    data: reviews,
    message: "Reviews get all successfully.",
  });
}
