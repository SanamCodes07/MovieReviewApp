import { InvalidMovieReviewPayload } from "../../services/movie-review-services/movie-review-errors";
import { MovieModel } from "../movie/movie-model";
import { UserModel } from "./auth_model";

type TCreateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function createUser(input: TCreateUserInput) {
  const user = new UserModel({
    username: input.username,
    password: input.password,
    email: input.email,
  });
  await user.save();
}

type TUpdateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function updateUser(toUpdateMovieId: String, input: TUpdateUserInput) {
  const user = await UserModel.findById(toUpdateMovieId);
  if (!user) {
    throw new Error("User not found");
  }

  await UserModel.replaceOne(
    { _id: toUpdateMovieId },
    {
      user: input.username,
      email: input.email,
      password: input.password,
    }
  );
}

type TgetAllUserInput = {
  username: string;
  email: string;
  password: string;
};
async function getAllUsers(input: TgetAllUserInput) {
  const users = await UserModel.find();
  return users;
}

async function deleteUser(userId: string) {
  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) {
    throw InvalidMovieReviewPayload;
  }
  await MovieModel.deleteOne({ _ });
}

function getUserByEmail() {}

async function getUserById(userId: string) {
  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("user not found!");
  }
  return user;
}

const userMongoService = {
  createUser,
  updateUser,
  getAllUsers,
};
