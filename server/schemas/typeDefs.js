const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  first_name: String
  last_name: String
  email: String
  password: String
  favorites: [Favorite]
  beercrawls: [BeerCrawl]
}

type Favorite {
  _id: ID
  breweryId: Float
  user: User
}

type BeerCrawl {
  title: String
  city: String
  state: String
  brewery_ids: String
  createdAt: String
  user: User

}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user: User

}

type Mutation {
  addUser(first_name: String!, last_name: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  updateUser(first_name: String!, last_name: String!, email: String!): User
}


`;

module.exports = typeDefs;