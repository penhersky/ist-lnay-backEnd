import {gql, concatenateTypeDefs} from "apollo-server-express";

const test = gql`
  type Query {
    hello: String
  }
`;

export default concatenateTypeDefs([test]);
