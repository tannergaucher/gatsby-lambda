const mongoose = require("mongoose")
const { ApolloServer } = require("apollo-server-lambda")
const { models: db } = require("../models")
const resolvers = require("../resolvers")
const typeDefs = require("../schema")

mongoose.connect(process.env.GATSBY_DATABASE_URL, { useNewUrlParser: true })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async => {
    return {
      db,
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
