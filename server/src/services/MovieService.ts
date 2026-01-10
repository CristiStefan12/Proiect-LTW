import { Movie, MovieGenre } from "../entities/Movie";

import { Director } from "../entities/Director";
import { Review } from "../entities/Review";

export class MovieService {
  static async getAllDirectors() {
    return await Director.find();
  }

  static async addDirector(name: string, nationality: string) {
    const director = Director.create({ name, nationality });
    return await director.save();
  }

  static async getAllMovies() {
    return await Movie.find({ relations: ["director", "reviews"] });
  }

  static async addMovie(
    title: string,
    releaseYear: number,
    genre: MovieGenre,
    directorId: number
  ) {
    const director = await Director.findOneBy({ id: directorId });
    if (!director) throw new Error("Director not found");

    const movie = Movie.create({ title, releaseYear, genre, director });
    return await movie.save();
  }

  static async deleteMovie(id: number) {
    const res = await Movie.delete(id);
    if (res.affected === 0) throw new Error("Movie not found");
    return "Movie deleted";
  }

  static async addReview(movieId: number, rating: number, text: string) {
    const movie = await Movie.findOneBy({ id: movieId });
    if (!movie) throw new Error("Movie not found");
    if (rating < 1 || rating > 5) throw new Error("Rating must be 1-5");

    const review = Review.create({ rating, text, movie });
    return await review.save();
  }
}
