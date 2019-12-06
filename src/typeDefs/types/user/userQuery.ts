import {gql} from "apollo-server-express";

export default gql`
  type queryUser {
    getUser(id: ID!): userRes
    getUsers: [user]
    getUserByGroupID(id: ID!): [user]
    getUserByCathedraID(id: ID!): [user]
  }
`;
