import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Director } from "./Director";
import { Review } from "./Review";

export enum MovieGenre {
  ACTION = "ACTION",
  DRAMA = "DRAMA",
  COMEDY = "COMEDY",
  SCIFI = "SCIFI",
}

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() title!: string;
  @Column() releaseYear!: number;
  @Column() genre!: string;

  @ManyToOne(() => Director, (director) => director.movies, {
    onDelete: "CASCADE",
  })
  director!: Director;
  @Column() directorId!: number;

  @OneToMany(() => Review, (review) => review.movie)
  reviews!: Review[];
}
