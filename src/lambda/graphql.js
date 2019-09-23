const mongoose = require("mongoose")
const { ApolloServer } = require("apollo-server-lambda")
const models = require("../models")
const resolvers = require("../resolvers")
const typeDefs = require("../schema")

mongoose.connect(process.env.GATSBY_DATABASE_URL, { useNewUrlParser: true })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async => {
    return {
      db: models,
    }
  },

  introspection: true,
  playground: true,
})

exports.handler = server.createHandler({
  cors: {
    credentials: true,
    origin: process.env.GATSBY_CLIENT_URL,
  },
})
