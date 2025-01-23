import express, { Request, Response, NextFunction } from "express";
import { homeController } from "./controllers/home-controller";
import { createMovieRoutes } from "./routes/movies-route";

import { MovieReviewAppError } from "./error";
import "./db";
import { createReviewRoutes } from "./routes/reviews-route";

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
