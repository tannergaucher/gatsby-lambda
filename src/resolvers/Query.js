const Query = {
  hello: () => {
    return `Hello from apollo-server-lambda`
  },

  messages: async (parent, args, { db }) => {
    const myMessages = await db.Message.find()

    return myMessages
  },
}

module.exports = Query
