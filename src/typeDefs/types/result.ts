import {gql} from "apollo-server-express";

export default gql`
  type result {
    message: String
    error: String
    redirect: Boolean
  }
  type LoginResult {
    message: String
    error: String
    token: String
  }
`;
