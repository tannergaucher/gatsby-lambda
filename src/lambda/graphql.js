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
      const myMessages = await db.Message.find()

      return myMessages
    },
  },
  Mutation: {
    createMessage: async (parent, { text }, { db }) => {
      const newMessage = await db.Message.create({
        text,
      })

      return newMessage
    },
  },
}

const typeDefs = gql`
  type Query {
    hello: String
    messages: [Message]!
  }

  type Message {
    id: ID!
    text: String
  }

  type Mutation {
    createMessage(text: String!): Message
  }
`

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
