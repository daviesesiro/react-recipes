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
    favorites: [Recipe]
}
type Token {
    token: String!
}


type Query {
    getAllRecipes: [Recipe]
    getCurrentUser: User
    getRecipe(id: ID!): Recipe
}

type Mutation {
    addRecipe(name: String!, description: String!, category: String!, instructions: String!): Recipe

    signupUser(username: String!, email:String!, password: String!):Token

    signinUser(username: String!, password: String!): Token
}


`;
