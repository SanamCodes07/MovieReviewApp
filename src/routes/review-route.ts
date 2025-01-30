import { Express } from "express";
import { createReviewController } from "../controllers/movie-review-controllers/review-controllers/create-review-controller";
import { updateReviewController } from "../controllers/movie-review-controllers/review-controllers/update-review-controller";
import { deleteReviewController } from "../controllers/movie-review-controllers/review-controllers/delete-review-controller";
import { getAllReviewController } from "../controllers/movie-review-controllers/review-controllers/getAll-review-controller";
import { getReviewByIdController } from "../controllers/movie-review-controllers/review-controllers/getById-review-controller";

export function createReviewRoutes(app: Express) {
  app.post("/reviews/create", createReviewController);
  app.put("/reviews/update/:reviewId", updateReviewController);
  app.delete("/reviews/delete/:reviewId", deleteReviewController);

  app.get("/reviews", getAllReviewController);
  app.get("/reviews/:reviewId", getReviewByIdController);
}
