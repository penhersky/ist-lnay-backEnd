import {gql} from "apollo-server-express";

export default gql`
  type userMutation {
    changePassword(password: String!): result
    updateUser(input: userInput): userRes
    updateAdditionalInformationUser(
      input: additionalInformationUserInput
    ): userRes
  }
`;
