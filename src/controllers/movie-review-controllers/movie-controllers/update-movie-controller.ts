import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-review-services/movie-services";
import { MovieReviewAppError } from "../../../error";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-services/movie-review-errors";
import { UpdateMovieSchema } from "../../../services/movie-review-services/movie-review-validations";

export async function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = Number(req.params.movieId);
    const body = req.body;

    const parsed = UpdateMovieSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
    }

    const movie = await movieService.getByIdMovie(movieId);
    if (!movie) {
      const movieNotFoundError = new MovieNotFound();
      next(movieNotFoundError);
      return;
    }

    movieService.updateMovie(movieId, {
      title: body.title,
      description: body.description,
      release_year: body.release_year,
      genre: body.genre,
    });

    res.json({
      message: "Movie updated successfully.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to update the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
