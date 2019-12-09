import {gql} from "apollo-server-express";

export default gql`
  type userMutation {
    changePassword(id: ID!, oldPassword: String!, password: String!): result
    updateUser(id: ID!, input: userInput): userRes
    updateAdditionalInformationUser(
      id: !ID
      input: additionalInformationUserInput
    ): userRes
  }
`;
