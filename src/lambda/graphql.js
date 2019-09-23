const mongoose = require("mongoose")
const { ApolloServer, gql } = require("apollo-server-lambda")

mongoose.connect(process.env.GATSBY_DATABASE_URL, { useNewUrlParser: true })

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
})

const Message = mongoose.model("Message", messageSchema)

const models = {
  Message,
}

const resolvers = {
  Query: {
    hello: () => {
      return `Hello from apollo-server-lambda`
    },

    messages: async (parent, args, { db }) => {
      const messages = await db.Message.find()
      return messages
    },
  },
  Mutation: {
    createMessage: async (parent, { text }, { db }) => {
      const message = await db.Message.create({
        text,
      })
      return message
    },
  },
}

const typeDefs = gql`
  type Message {
    text: String
    id: ID!
  }

  type Query {
    hello: String
    messages: [Message]
  }

  type Mutation {
    createMessage(text: String!): Message
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      db: models,
    }
  },
  playground: true,
})

exports.handler = server.createHandler({
  cors: {
    credentials: true,
    origin: process.env.GATSBY_CLIENT_URL,
  },
})
