import React, { useState } from "react"
import { Link } from "gatsby"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function SecondPage() {
  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <CreateMessage />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION($text: String!) {
    createMessage(text: $text) {
      text
    }
  }
`

function CreateMessage() {
  const [text, setText] = useState("")
  const [createMessage, { loading, error }] = useMutation(
    CREATE_MESSAGE_MUTATION,
    {
      variables: {
        text,
      },
    }
  )

  return (
    <fieldset disabled={loading}>
      {error && `${error.message}`}
      <form
        onSubmit={async e => {
          e.preventDefault()
          const res = await createMessage()
          console.log(res)
        }}
      >
        <input
          type="text"
          placeholder="Add a message"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Submit Message</button>
      </form>
    </fieldset>
  )
}
