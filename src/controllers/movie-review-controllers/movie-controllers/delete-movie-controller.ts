import { Request, Response, NextFunction } from "express";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-services/movie-review-errors";
import { movieService } from "../../../services/movie-review-services/mysql_movie-services";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../mongo/movie/mongo_movie-services";

export async function deleteMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (process.env.DATATYPE_TYPE === "MYSQL") {
      const movieId = Number(req.params.movieId);
      const movie = await movieService.getByIdMovie(movieId);
      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }
    } else {
      const movieId = String(req.params.movieId);
      await movieMongoService.deleteMovie(movieId);
      res.json({
        message: "Movies deleted successfully",
      });
    }
  } catch (error) {
    const movieError = new MovieReviewAppError("Not found the MovieId", 500);
    next(movieError);
  }
}
