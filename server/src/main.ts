import "reflect-metadata";

import { AppDataSource } from "./config/db";
import { Director } from "./entities/Director";
import Fastify from "fastify";
import cors from "@fastify/cors";
import mercurius from "mercurius";
import { resolvers } from "./graphql/resolvers";
import { schema } from "./graphql/schema";

const start = async () => {
  const app = Fastify();
  await app.register(cors, { origin: true });

  await AppDataSource.initialize();
  console.log("Database Connected");

  if ((await Director.count()) === 0) {
    await Director.save(
      Director.create({ name: "Christopher Nolan", nationality: "UK" })
    );
    await Director.save(
      Director.create({ name: "Steven Spielberg", nationality: "USA" })
    );
    console.log("Seeded Directors");
  }

  await app.register(mercurius, { schema, resolvers, graphiql: true });

  try {
    await app.listen({ port: 4000 });
    console.log(`Server ready at http://localhost:4000/graphiql`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
