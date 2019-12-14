import {gql} from "apollo-server-express";

export const typeGroup = gql`
  type group {
    id: ID!
    name: String!
    cathedra: cathedra!
    information: String
    fails: [String]
    people: [user!]
    createdAt: String!
    updatedAt: String!
  }

  input groupInput {
    name: String!
    cathedra: ID!
    information: String
  }

  union groupRes = group | result
`;

export const groupQuery = gql`
  type queryGroup {
    getGroup(id: ID!): groupRes
    getGroupsByCathedraId(id: ID!): [group!]
    getGroups: [group!]
  }
`;

export const groupMutation = gql`
  type mutationGroup {
    addGroup(input: groupInput): groupRes
    updateGroup(id: ID!, input: groupInput): groupRes
    deleteGroup(id: ID!): result
  }
`;
