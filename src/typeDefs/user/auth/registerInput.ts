import {gql} from "apollo-server-express";

export default gql`
  type Mutation {
    startRegister(name: String!, surname: String!, email: String!): result
    finishRegister(password: String!): result
  }
`;
