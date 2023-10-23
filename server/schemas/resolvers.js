const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        )

        return userData
      }

      throw AuthenticationError
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw AuthenticationError
      }

      const correctPassword = await user.isCorrectPassword(password)

      if (!correctPassword) {
        throw AuthenticationError
      }

      const token = signToken(user)
      return { token, user }
    }
  }
}

module.exports = resolvers
