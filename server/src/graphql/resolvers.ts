import { IResolvers } from "mercurius";
import { MovieService } from "../services/MovieService";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";

export const resolvers: IResolvers = {
  Query: {
    directors: async () => MovieService.getAllDirectors(),
    movies: async () => MovieService.getAllMovies(),
    users: async () => User.find(),
  },
  Mutation: {
    addDirector: async (_, { name, nationality }) =>
      MovieService.addDirector(name, nationality),
    addMovie: async (_, { title, releaseYear, genre, directorId }) =>
      MovieService.addMovie(title, releaseYear, genre, directorId),
    deleteMovie: async (_, { id }) => MovieService.deleteMovie(id),
    addReview: async (_, { movieId, rating, text }) =>
      MovieService.addReview(parseInt(movieId), rating, text),

    registerUser: async (_, { name, email, password, role }) =>
      UserService.register(name, email, password, role),

    loginUser: async (_, { email, password }) =>
      UserService.login(email, password),
  },
};
