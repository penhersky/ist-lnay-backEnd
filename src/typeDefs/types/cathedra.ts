import {gql} from "apollo-server-express";

export const typeCathedra = gql`
  type cathedra {
    id: ID!
    name: String!
    faculty: String!
    information: String
    images: [String]
    createdAt: String!
    updatedAt: String!
  }

  input cathedraInput {
    name: String!
    faculty: String!
    information: String
    images: [String]
  }

  type allCathedra {
    countPage: Int
    currentPage: Int
    allCathedra: [cathedra]
    error: String
  }

  union cathedraRes = cathedra | result
`;

export const cathedraQuery = gql`
  type queryCathedra {
    getCathedra(id: ID!): cathedraRes
    getAllCathedraByFaculty(
      name: String!
      page: Int
      itemsPerPage: Int
    ): allCathedra
    getAllCathedra(page: Int, itemsPerPage: Int): allCathedra
  }
`;

export const cathedraMutation = gql`
  type mutationCathedra {
    addCathedra(input: cathedraInput): cathedraRes
    updateCathedra(id: ID!, input: cathedraInput): cathedraRes
    deleteCathedra(id: ID!): result
  }
`;
