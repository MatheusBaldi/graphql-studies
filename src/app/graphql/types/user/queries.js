const { gql, ForbiddenError } = require('apollo-server-express');
const FindUsers = require('../../../domain/use-cases/user/find-user/FindUsers');
const FindUser = require('../../../domain/use-cases/user/find-user/FindUser');

const typeDefs = gql`
  extend type Query {
  """Query to find all active uses from application"""
    findUsers: [User]

    findUser(
      where: InputUserWhere
    ): User
  }  
`;

const resolvers = {
  Query: {
    findUsers:  (
      root,
      data,
      {
        db: { UserPersistentModel },
        UserLogged,
      },
    ) => FindUsers(data, { UserPersistentModel, UserLogged, ForbiddenError }),

    findUser: (
      root,
      data,
      {
        db: { UserPersistentModel },
        UserLogged
      }
    ) => FindUser(data, { UserPersistentModel, UserLogged, ForbiddenError }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
