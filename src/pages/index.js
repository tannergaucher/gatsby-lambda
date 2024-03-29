import React from "react"
import { Link } from "gatsby"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const HELLO_QUERY = gql`
  query HELLO_QUERY {
    hello
  }
`

export default function IndexPage() {
  const { data, loading, error } = useQuery(HELLO_QUERY)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi</h1>
      <p>Welcome to your new Gatsby app.</p>
      {loading && `Loading from server..`}
      {error && `${error.message}`}
      {data && data.hello && `${data.hello}`}

      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Make a database mutation on page 2</Link>
    </Layout>
  )
}
