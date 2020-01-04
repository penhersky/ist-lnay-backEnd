import {gql} from "apollo-server-express";

export default gql`
  type Mutation {
    startRegister(
      name: String!
      surname: String!
      email: String!
      password: String!
      platform: String
    ): result
    finishRegister(id: Int!, key: String!): result
    forgotPasswordFinish(id: Int, key: String!, newPassword: String!): result

    User: userMutation
    Group: mutationGroup
    Cathedra: mutationCathedra
    File: mutationFile
    News: mutationNews
  }
`;
