import {News} from "../../database/models";
import pagination from "../pagination";

export default {
  getNews: async (_: any, {id}: any, context: any) => {
    try {
      const news = await News.findOne({where: {id}});
      await news.update({views: ++news.views});
      return news || {message: "News is not found!"};
    } catch (error) {
      return {error: "Server Error! Kod(521)"};
    }
  },
  getNewsByAuthorId: async (
    _: any,
    {id, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const userNews = await News.findAll({
        where: {author: id},
        order: [["id", "DESC"]]
      });
      const returnPage = pagination(userNews, page, itemsPerPage);
      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(522)"};
    }
  },
  getNewsByGroupId: async (
    _: any,
    {id, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const groupNews = await News.findAll({
        where: {group: id},
        order: [["id", "DESC"]]
      });
      const returnPage = pagination(groupNews, page, itemsPerPage);
      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(523)"};
    }
  },
  getNewsByCathedraId: async (
    _: any,
    {id, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const groupNews = await News.findAll({
        where: {cathedra: id},
        order: [["id", "DESC"]]
      });
      const returnPage = pagination(groupNews, page, itemsPerPage);
      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(523)"};
    }
  },
  getAllNews: async (_: any, {page, itemsPerPage}: any, context: any) => {
    try {
      const allNews = await News.findAll({order: [["id", "DESC"]]});
      const returnPage = pagination(allNews, page, itemsPerPage);
      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(525)"};
    }
  }
};
