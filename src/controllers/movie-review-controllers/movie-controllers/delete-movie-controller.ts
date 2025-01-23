import { Request, Response, NextFunction } from "express";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-services/movie-review-errors";
import { movieService } from "../../../services/movie-review-services/movie-services";
import { MovieReviewAppError } from "../../../error";

export function deleteMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = Number(req.params.movieId);
    if (!movieId) {
      const invalidPayLoadError = new InvalidMovieReviewPayload(movieId);
      next(invalidPayLoadError);
      return;
    }

    const movie = movieService.getByIdMovie(movieId);
    if (!movie) {
      const movieNotFoundError = new MovieNotFound();
      next(movieNotFoundError);
      return;
    }

    movieService.deleteMovie(movieId);

    res.json({
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError("Not found the MovieId", 500);
    next(movieError);
  }
}
