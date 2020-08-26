import { gql } from "apollo-boost";

// Recipes Queries
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      description
      category
    }
  }
`;

export const GET_RECIPE = gql`
  query($id: ID!) {
    getRecipe(id: $id) {
      _id
      name
      category
      description
      username
      instructions
      createdDate
      likes
    }
  }
`;

// Recipes mutations
export const ADD_RECIPE = gql`
  mutation(
    $name: String!
    $description: String!
    $category: String!
    $instructions: String!
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
    ) {
      _id
      name
      username
      category
    }
  }
`;
// user Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      joinedDate
    }
  }
`;
// user mutation
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
