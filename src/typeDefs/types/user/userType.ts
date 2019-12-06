import {gql} from "apollo-server-express";

export const typeUser = gql`
  type user {
    id: ID!
    name: String!
    surname: String!
    position: String!
    email: String!
    additionalInformation: additionalInformationUser
  }

  type additionalInformationUser {
    image: String
    group: group
    cathedra: cathedra
    faculty: String
    phonNumber: String
    studentNumber: ID
    born: String
    residence: String
    otherInformation: String
  }

  input userInput {
    name: String!
    surname: String!
    position: String!
    email: String!
  }

  input additionalInformationUserInput {
    image: String
    group: ID
    cathedra: ID
    faculty: String
    phonNumber: String
    studentNumber: ID
    born: String
    residence: String
    otherInformation: String
  }

  union userRes = user | result
`;
