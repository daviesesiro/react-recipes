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

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      category
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

export const LIKE_RECIPE = gql`
  mutation($id: ID!) {
    likeRecipe(id: $id) {
      _id
      likes
    }
  }
`;
export const UNLIKE_RECIPE = gql`
  mutation($id: ID!) {
    unLikeRecipe(id: $id) {
      _id
      likes
    }
  }
`;

export const DELETE_USER_RECIPE = gql`
  mutation($id: ID!) {
    deleteUserRecipe(id: $id) {
      _id
    }
  }
`;
// user Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      favourites {
        _id
        name
      }
      email
      joinedDate
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query {
    getUserRecipes {
      _id
      name
      likes
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
