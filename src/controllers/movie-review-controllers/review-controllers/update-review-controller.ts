import { Request, Response, NextFunction } from "express";
import { reviewServices } from "../../../services/movie-review-services/mysql_review-services";
import {
  InvalidMovieReviewPayload,
  ReviewNotFound,
} from "../../../services/movie-review-services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { UpdateReviewSchema } from "../../../services/movie-review-services/movie-schema";

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = Number(req.params.reviewId);
    const body = req.body;
    const parsed = UpdateReviewSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
    }

    const review = await reviewServices.getByIdReview(reviewId);
    if (!review) {
      const reviewNotFoundError = new ReviewNotFound();
      next(reviewNotFoundError);
      return;
    }

    reviewServices.updateReview(reviewId, {
      movieId: body.movieId,
      userId: body.userId,
      rating: body.rating,
      review: body.review,
    });

    res.json({
      message: "Review updated successfully.",
    });
  } catch (error) {
    const reviewerror = new MovieReviewAppError(
      "Failed to update the review. something went wrong in server.",
      500
    );
    next(reviewerror);
  }
}
