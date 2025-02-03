import { z } from "zod";

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
