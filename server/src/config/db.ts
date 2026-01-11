import { DataSource } from "typeorm";
import { Director } from "../entities/Director";
import { Movie } from "../entities/Movie";
import { Review } from "../entities/Review";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "cinema.sqlite",
  synchronize: true,
  logging: false,
  entities: [Director, Movie, Review, User],
});
