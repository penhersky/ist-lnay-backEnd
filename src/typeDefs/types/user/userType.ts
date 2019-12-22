import {gql} from "apollo-server-express";

export const typeUser = gql`
  type user {
    id: ID!
    name: String!
    surname: String!
    position: String!
    email: String!
    createdAt: String!
    updatedAt: String!
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

  type users {
    countPage: Int
    currentPage: Int
    users: [user]
    error: String
  }

  union userRes = user | result
`;
