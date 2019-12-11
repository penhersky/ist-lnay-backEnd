import {gql} from "apollo-server-express";

export default gql`
  type userMutation {
    changePassword(id: ID!, oldPassword: String!, password: String!): result
    updateUser(id: ID!, input: userInput): userRes
    changePosition(id: ID!, position: String!): result
    updateAdditionalInformationByUserId(
      id: ID!
      input: additionalInformationUserInput
    ): result
    deleteUser(id: ID!): result
  }
`;
