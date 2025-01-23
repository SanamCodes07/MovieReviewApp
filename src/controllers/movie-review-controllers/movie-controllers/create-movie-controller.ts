import { Request, Response, NextFunction } from "express";
import { CreateMovieSchema } from "../../../services/movie-review-services/movie-review-validations";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-services/movie-review-errors";
import { movieService } from "../../../services/movie-review-services/movie-services";

export function createMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  console.log(body);
  const parsed = CreateMovieSchema.safeParse(body);
  if (!parsed.success) {
    const parseError = parsed.error.flatten();
    const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
    next(invalidPayloadError);
    return;
  }

  movieService.createMovie({
    title: parsed.data.title,
    description: parsed.data.description,
    release_year: parsed.data.release_year,
    genre: parsed.data.genre,
  });

  res.json({
    message: "Movie added successfully.",
  });
}
