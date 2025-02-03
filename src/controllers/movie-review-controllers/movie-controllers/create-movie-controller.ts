import { Request, Response, NextFunction } from "express";
import { CreateMovieSchema } from "../../../services/movie-review-services/movie-schema";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-services/movie-review-errors";
import { movieService } from "../../../services/movie-review-services/mysql_movie-services";
import { movieMongoService } from "../../../mongo/movie/mongo_movie-services";
import { MovieReviewAppError } from "../../../error";

export async function createMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const userType = "super";
  try {
    const body = req.body;
    console.log(body);
    const parsed = CreateMovieSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE == "MYSQL") {
      movieService.createMovie({
        title: parsed.data.title,
        description: parsed.data.description,
        release_year: parsed.data.release_year,
        genre: parsed.data.genre,
      });
    } else {
      await movieMongoService.createMovie({
        title: parsed.data.title,
        description: parsed.data.description,
        release_year: parsed.data.release_year,
        genre: parsed.data.genre,
      });
    }
    res.json({
      message: "Movie added successfully.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to update the movie. something went wrong in server.",
      500
    );
  }
}
