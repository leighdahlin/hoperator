const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Favorite, BeerCrawl } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if(context.user){
        const user = await User.findById(context.user._id).populate({
          path: 'items'
        });
        return user;
      }    
  },

  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
    },
    updateUser: async (parent, args, context) => {
        if (context.user) {
          return User.findByIdAndUpdate(context.user._id, args, {
            new: true,
          });
        }

        throw new AuthenticationError('Not logged in');
    },


    },
};

module.exports = resolvers;