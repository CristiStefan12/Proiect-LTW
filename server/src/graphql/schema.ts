export const schema = `
  enum MovieGenre {
    ACTION
    DRAMA
    COMEDY
    SCIFI
  }

  enum Role {
    ADMIN
    USER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
  }

  type AuthPayload {
    token: String!
    user: User!
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
    users: [User!]!
  }

  type Mutation {
    addDirector(name: String!, nationality: String!): Director!
    addMovie(title: String!, releaseYear: Int!, genre: MovieGenre!, directorId: ID!): Movie!
    deleteMovie(id: ID!): String
    addReview(movieId: ID!, rating: Int!, text: String!): Review!
    
    registerUser(name: String!, email: String!, password: String!, role: Role!): User!
    loginUser(email: String!, password: String!): AuthPayload!
  }
`;
