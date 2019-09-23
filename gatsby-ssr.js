const React = require("react")
const { ApolloProvider } = require("@apollo/react-hooks")

const { client } = require("./src/components/apollo/client")

exports.wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
