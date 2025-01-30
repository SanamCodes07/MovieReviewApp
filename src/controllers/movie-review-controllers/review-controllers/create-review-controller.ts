import { NextFunction, Request, Response } from "express";
import { createReviewSchema } from "../../../services/movie-review-services/movie-review-schemas";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-services/movie-review-errors";
import { reviewServices } from "../../../services/movie-review-services/mysql_review-services";

export function createReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  console.log(body);
  const parsed = createReviewSchema.safeParse(body);
  if (!parsed.success) {
    const parseError = parsed.error.flatten();
    const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
    next(invalidPayloadError);
    return;
  }
  reviewServices.createReviews({
    movieId: parsed.data.movieId,
    userId: parsed.data.userId,
    rating: parsed.data.rating,
    review: parsed.data.review,
  });
  res.json({
    message: "Review added successfully",
  });
}
