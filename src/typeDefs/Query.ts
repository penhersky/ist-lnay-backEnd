import {gql} from "apollo-server-express";

export default gql`
  type Query {
    login(email: String!, password: String!): LoginResult
    forgotPasswordStart(email: String!): result

    User: queryUser
    Group: queryGroup
    Cathedra: queryCathedra
  }
`;
