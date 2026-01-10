export const schema = `
  enum MovieGenre {
    ACTION
    DRAMA
    COMEDY
    SCIFI
  }

  type Review {
    id: ID!
    rating: Int!
    text: String!
  }

  type Director {
    id: ID!
    name: String!
    nationality: String!
  }

  type Movie {
    id: ID!
    title: String!
    releaseYear: Int!
    genre: MovieGenre!
    director: Director!
    reviews: [Review!]!
  }

  type Query {
    directors: [Director!]!
    movies: [Movie!]!
  }

  type Mutation {
    addDirector(name: String!, nationality: String!): Director!
    addMovie(title: String!, releaseYear: Int!, genre: MovieGenre!, directorId: ID!): Movie!
    deleteMovie(id: ID!): String
    addReview(movieId: ID!, rating: Int!, text: String!): Review!
  }
`;
