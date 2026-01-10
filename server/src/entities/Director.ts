import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Movie } from "./Movie";

@Entity()
export class Director extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column() name!: string;

  @Column() nationality!: string;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies!: Movie[];
}
