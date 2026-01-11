import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query GetData {
    directors { id name }
    movies {
      id title releaseYear genre
      director { name }
      reviews { id rating text }
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $releaseYear: Int!, $genre: MovieGenre!, $directorId: ID!) {
    addMovie(title: $title, releaseYear: $releaseYear, genre: $genre, directorId: $directorId) {
      id title
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id)
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($movieId: ID!, $rating: Int!, $text: String!) {
    addReview(movieId: $movieId, rating: $rating, text: $text) {
      id
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!, $role: Role!) {
    registerUser(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;