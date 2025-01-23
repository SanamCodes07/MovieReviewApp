import { z } from "zod";

export const CreateMovieSchema = z.object({
  title: z.string().min(1).max(25),
  description: z.string().min(5).max(255),
  release_year: z.number().min(1990).max(2030),
  genre: z.string().min(1).max(25),
});

export const UpdateMovieSchema = z.object({
  title: z.string().min(1).max(25),
  description: z.string().min(5).max(255),
  release_year: z.number().min(1990).max(2030),
  genre: z.string().min(1).max(25),
});

export const createReviewSchema = z.object({
  movieId: z.number(),
  userId: z.number(),
  rating: z.number().min(1).max(5),
  review: z.string(),
});

export const UpdateReviewSchema = z.object({
  movieId: z.number(),
  userId: z.number(),
  rating: z.number().min(1).max(5),
  review: z.string(),
});
