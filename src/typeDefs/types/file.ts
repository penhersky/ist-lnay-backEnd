import {gql} from "apollo-server-express";

export const typeFile = gql`
  type File {
    id: ID!
    path: String
    owner: user!
    name: String
    information: String
    createAt: String
    updateAt: String
  }

  input fileInput {
    name: String
    owner: ID!
    path: String!
    information: String
  }

  union fileRes = result | File
`;

export const fileQuery = gql`
  type queryFile {
    getFile(id: ID!): fileRes
    getFileByGroupId(id: ID!): [File!]
    getFiles: [File!]
  }
`;

export const fileMutation = gql`
  type mutationFile {
    addFile(input: fileInput): fileRes
    updateFile(id: ID!, input: fileInput): fileRes
    deleteFile(id: ID!): result
  }
`;
