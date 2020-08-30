exports.typeDefs = `

type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinedDate: String
    favourites: [Recipe]
}
type Token {
    token: String!
}


type Query {
    getAllRecipes: [Recipe]

    getCurrentUser: User

    getUserRecipes: [Recipe]

    getRecipe(id: ID!): Recipe

    searchRecipes(searchTerm:String): [Recipe]
}

type Mutation {
    addRecipe(name: String!, description: String!, category: String!, instructions: String!): Recipe
    deleteUserRecipe(id: ID!):Recipe
    likeRecipe(id:ID!): Recipe
    unLikeRecipe(id:ID!): Recipe

    signupUser(username: String!, email:String!, password: String!):Token
    signinUser(username: String!, password: String!): Token

}


`;
