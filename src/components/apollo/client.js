import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

export const client = new ApolloClient({
  fetch,
  uri: "http://localhost:8888",
})
