import {gql} from "apollo-server-express";

export const typeCathedra = gql`
  type cathedra {
    id: ID!
    name: String!
    faculty: String!
    information: String
    fails: [String]
    createAt: String!
  }

  input cathedraInput {
    name: String!
    faculty: String!
    information: String
    fails: [String]
  }

  union cathedraRes = cathedra | result
`;

export const cathedraQuery = gql`
  type queryCathedra {
    getCathedra(id: ID!): cathedraRes
    getAllCathedra: [cathedra!]
  }
`;

export const cathedraMutation = gql`
  type mutationCathedra {
    addCathedra(input: cathedraInput): cathedraRes
    updateCathedra(id: ID!, input: cathedraInput): cathedraRes
    deleteCathedra(id: ID!): result
  }
`;
