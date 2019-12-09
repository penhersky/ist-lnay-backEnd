import {gql} from "apollo-server-express";

export default gql`
  type queryUser {
    getUser(id: ID!): userRes
    getUsers: [user]
    getUsersByGroupID(id: ID!): [user]
    getUsersByCathedraID(id: ID!): [user]
  }
`;
