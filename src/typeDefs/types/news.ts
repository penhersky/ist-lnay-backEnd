import {gql} from "apollo-server-express";

export const typeNews = gql`
  type news {
    id: ID!
    title: String!
    body: String!
    author: user!
    views: Int!
    group: group
    cathedra: cathedra
    video: String
    images: [String]
    files: [String]
    createdAt: String!
    updatedAt: String!
  }

  input newsInput {
    title: String!
    body: String!
    group: ID
    cathedra: ID
    video: String
    images: [String]
    files: [String]
  }

  type allNews {
    countPage: Int
    currentPage: Int
    groups: [news]
    error: String
  }

  union newsRes = news | result
`;

export const newsQuery = gql`
  type queryNews {
    getNews(id: ID!): newsRes
    getNewsByAuthorId(id: ID!, page: Int, itemsPerPage: Int): allNews
    getNewsByGroupId(id: ID!, page: Int, itemsPerPage: Int): allNews
    getNewsByCathedraId(id: ID!, page: Int, itemsPerPage: Int): allNews
    getAllNews(page: Int, itemsPerPage: Int): allNews
  }
`;

export const newsMutation = gql`
  type mutationNews {
    addNews(input: newsInput): newsRes
    updateNews(id: ID!, input: newsInput): newsRes
    deleteNews(id: ID!): result
  }
`;
