import {gql} from "apollo-server-express";

export default gql`
  type queryUser {
    getUser(id: ID!): userRes
    getUsers(page: Int, itemsPerPage: Int): users
    getUsersByGroupID(id: ID!, page: Int, itemsPerPage: Int): users
    getUsersByCathedraID(id: ID!, page: Int, itemsPerPage: Int): users
  }
`;
