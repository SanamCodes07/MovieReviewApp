import { ReviewModel } from "./review-model";

type TReviews = {
  id: number;
  movieId: number;
  userId: number;
  rating: number;
  review: string;
};

async function createReviews(input: Omit<TReviews, "id">) {
  const review = new ReviewModel({
    userId: input.userId,
    movieId: input.movieId,
    rating: input.rating,
    review: input.review,
  });
  await review.save();
  return review;
}
