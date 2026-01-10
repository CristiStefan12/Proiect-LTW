import { IResolvers } from "mercurius";
import { MovieService } from "../services/MovieService";

export const resolvers: IResolvers = {
  Query: {
    directors: async () => MovieService.getAllDirectors(),
    movies: async () => MovieService.getAllMovies(),
  },
  Mutation: {
    addDirector: async (_, { name, nationality }) =>
      MovieService.addDirector(name, nationality),
    addMovie: async (_, { title, releaseYear, genre, directorId }) =>
      MovieService.addMovie(title, releaseYear, genre, directorId),
    deleteMovie: async (_, { id }) => MovieService.deleteMovie(id),
    addReview: async (_, { movieId, rating, text }) =>
      MovieService.addReview(parseInt(movieId), rating, text),
  },
};
