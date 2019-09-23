const { gql } = require("apollo-server-lambda")

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

module.exports = typeDefs
