const { ApolloServer, gql } = require("apollo-server-lambda")

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return `Hello from apollo-server-lambda!`
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

exports.handler = server.createHandler({
  cors: {
    credentials: true,
    origin: process.env.GATSBY_CLIENT_URL,
  },
})
