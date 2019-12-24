import {gql} from "apollo-server-express";

export const typeNews = gql`
  type news {
    id: ID!
    title: String!
    body: String!
    author: user!
    views: Int!
    video: String
    image: [String]
    fills: [String]
    createdAt: String!
    updatedAt: String!
  }

  input newsInput {
    title: String!
    body: String!
    image: [String]
    author: ID!
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
    getNewsByUserId(id: ID!, page: Int): [news!]
    getAllNews(page: Int): [news!]
  }
`;

export const newsMutation = gql`
  type mutationNews {
    addNews(input: newsInput): newsRes
    updateNews(id: ID!, input: newsInput): newsRes
    deleteNews(id: ID!): result
  }
`;
