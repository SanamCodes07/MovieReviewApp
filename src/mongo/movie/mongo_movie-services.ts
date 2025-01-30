import { title } from "process";
import { MovieModel } from "./movie-model";
import { InvalidMovieReviewPayload } from "../../services/movie-review-services/movie-review-errors";

type TMovie = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string;
};

async function createMovie(input: Omit<TMovie, "id">) {
  const movie = new MovieModel({
    title: input.title,
    genre: input.genre,
    description: input.description,
    release_year: input.release_year,
  });

  await movie.save();

  return movie;
}

async function updateMovie(toUpdateMovieId: string, input: Omit<TMovie, "id">) {
  const movie = await MovieModel.findById(toUpdateMovieId);

  if (!movie) {
    throw new Error("movie not found!");
  }

  await MovieModel.replaceOne(
    { _id: toUpdateMovieId },
    {
      title: input.title,
      description: input.description,
      genre: input.genre,
      release_year: input.release_year,
    }
  );

  // second option
  // await MovieModel.updateOne(
  //   {
  //     _id: toUpdateMovieId,
  //   },
  //   {
  //     title: input.title,
  //     description: input.description,
  //     genre: input.genre,
  //     release_year: input.release_year,
  //   }
  // );
}
async function getAllMovie() {
  const movies = await MovieModel.find();
  return movies;
}

async function getByIdMovie(movieId: string) {
  const movie = await MovieModel.findById(movieId);

  if (!movie) {
    throw new Error("movie notfound!");
  }

  return movie;
}

export async function deleteMovie(movieId: string) {
  const movie = await MovieModel.findByIdAndDelete(movieId);
  if (!movie) {
    throw InvalidMovieReviewPayload;
  }
  await MovieModel.deleteOne({ _id: movieId });
  return movie;
}

export const movieMongoService = {
  createMovie,
  updateMovie,
  getAllMovie,
  getByIdMovie,
  deleteMovie,
};
