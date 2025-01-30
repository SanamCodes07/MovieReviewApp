import express, { Request, Response, NextFunction } from "express";
import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movie-route";

import { MovieReviewAppError } from "./error";
import "./mysql-db";
import { createReviewRoutes } from "./routes/review-route";

import { connectMongoDb } from "./mongo-db";

connectMongoDb().then(() => {
  console.log("MongoDB connected");
});

const app = express();

app.use(express.json());

app.get("/", homeController);

createMovieRoutes(app);

createReviewRoutes(app);

//global error handler
app.use(
  (
    error: MovieReviewAppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("caught error", error);

    res.status(error.status || 500).json({
      message: error.message,
      meta: error.meta,
    });
  }
);

app.listen(4005, () => {
  console.log("server started at http://localhost:4005");
});
