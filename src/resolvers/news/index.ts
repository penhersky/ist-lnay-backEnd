import type from "./type";
import queryNews from "./Query";
import mutationNews from "./Mutation";

export const NewsTypes = {
  ...type,
  queryNews,
  mutationNews
};

export const NewsQuery = {
  News: queryNews.getNews
};

export const NewsMutation = {
  News: mutationNews.addNews
};
