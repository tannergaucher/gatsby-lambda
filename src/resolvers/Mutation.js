const Mutation = {
  createMessage: async (parent, { text }, { db }) => {
    const newMessage = await db.Message.create({
      text,
    })

    return newMessage
  },
}

module.exports = Mutation
