const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const cors = require("cors");
const Recipe = require("./models/Recipe");
const User = require("./models/User");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// Bring in graphql express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

// create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());

// set up jwt authentication middlewaer
app.use(async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
  }

  try {
    if (token) {
      token = token.split(" ")[1];
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    }
  } catch (error) {}
  next();
});

// create graphiql application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// connect schemas with graphql
app.use(
  "/graphql",
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser,
    },
  }))
);

const PORT = process.env.PORT || 8000;

// connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => console.log("Server has started on PORT = " + PORT));
  })
  .catch((err) => console.log(err));
