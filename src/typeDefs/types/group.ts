import {gql, ITypedef} from "apollo-server-express";

export const typeGroup: ITypedef = gql`
  type group {
    id: ID!
    name: String!
    cathedra: cathedra!
    information: String
    people: [user!]
    createAt: Date!
  }

  input groupInput {
    name: String!
    cathedra: ID!
    information: String
  }
`;

export const groupQuery = gql`
    type queryGroup {
        getGroup(id: ID!): group | result
        getGroups: [group!]
    }
`;

export const groupMutation = gql`
    type mutationGroup{
        addGroup(input:groupInput): group | result
        updateGroup(id: ID!, input: groupInput): group | result
        deleteGroup(id: ID!): result
    }
`;
