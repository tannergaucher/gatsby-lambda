import React, { useState } from "react"
import { Link } from "gatsby"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function SecondPage() {
  const { data, loading, error } = useQuery(MESSAGES_QUERY)

  console.log(loading, error, data)

  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      {loading && `Loading messages...`}
      {error && `${error.message}`}
      {data &&
        data.messages &&
        data.messages.map(message => <p key={message.id}>{message.text}</p>)}
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

const MESSAGES_QUERY = gql`
  query MESSAGES_QUERY {
    messages {
      text
    }
  }
`
