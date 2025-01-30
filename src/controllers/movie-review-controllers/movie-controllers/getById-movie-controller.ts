import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-review-services/mysql_movie-services";
import {
  MovieNotFound,
  InvalidMovieReviewPayload,
} from "../../../services/movie-review-services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../mongo/movie/mongo_movie-services";
export async function getMovieByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (process.env.DATATYPE_TYPE === "MYSQL") {
      const movieId = Number(req.params.movieId);
      const movie = await movieService.getByIdMovie(movieId);
      res.json({
        data: movie,
        message: "Movies get  by Id Successfully.",
      });
    } else {
      const movieId = req.params.movieId;
      const movie = await movieMongoService.getByIdMovie(movieId);
      res.json({
        data: movie,
        message: "Movies get by Id Successfully.",
      });
    }
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed movie to get by Id.Smth. went wrong in server.",
      500
    );
    next(movieError);
  }
}
