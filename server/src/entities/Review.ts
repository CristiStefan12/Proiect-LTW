import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Movie } from "./Movie";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() rating!: number;
  @Column() text!: string;
  @ManyToOne(() => Movie, (movie) => movie.reviews, { onDelete: "CASCADE" })
  movie!: Movie;
  @Column() movieId!: number;
}
