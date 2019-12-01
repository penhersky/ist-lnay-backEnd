import {gql, concatenateTypeDefs} from "apollo-server-express";

import User from "./user";
import result from "./types/result";

const test = gql`
  type Query {
    hello: String
  }
`;

export default concatenateTypeDefs([test, result, User]);
