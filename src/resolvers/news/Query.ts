import {News} from "../../database/models";
import pagination from "../pagination";

export default {
  getNews: async (_: any, {id}: any, context: any) => {
    try {
      const news = await News.findOne({where: {id}});
      return news || {message: "News is not found!"};
    } catch (error) {
      return {error: "Server Error! Kod(521)"};
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
