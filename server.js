const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Bring in graphql express middleware
const { graphiqlExpress,graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// create schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})




// initalise database
const app = express();
app.use(express.json)
// create graphiql application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.get('/', (req, res)=> res.json('s'))

// connect schemas with graphql
app.use('/graphql', graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}));

const PORT = process.env.PORT || 5000;
// connect to the database

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('db connected')
        app.listen(PORT, () =>console.log('Server has started on PORT = '+PORT))
    })
    .catch((err)=>console.log(err))
