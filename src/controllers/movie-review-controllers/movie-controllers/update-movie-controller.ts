import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie-review-services/mysql_movie-services";
import { MovieReviewAppError } from "../../../error";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-services/movie-review-errors";
import { UpdateMovieSchema } from "../../../services/movie-review-services/movie-schema";
import { movieMongoService } from "../../../mongo/movie/mongo_movie-services";

export async function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;
    const body = req.body;
    console.log(body);

    const parsed = UpdateMovieSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numMovieId = Number(movieId);
      const movie = await movieService.getByIdMovie(numMovieId);
      res.json({
        data: movie,
        message: "Movies get all successfully.",
      });

      movieService.updateMovie(numMovieId, {
        title: body.title,
        description: body.description,
        release_year: body.release_year,
        genre: body.genre,
      });
    } else {
      await movieMongoService.updateMovie(movieId, {
        title: body.title,
        description: body.description,
        release_year: body.release_year,
        genre: body.genre,
      });
    }

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
