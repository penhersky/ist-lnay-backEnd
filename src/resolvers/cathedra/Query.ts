import {Cathedra} from "../../database/models";
import pagination from "../pagination";

export default {
  getCathedra: async (_: any, {id}: any, context: any) => {
    try {
      const cathedra = await Cathedra.findOne({where: {id}});
      if (!cathedra) return {error: "Cathedra is not found!"};
      return await cathedra;
    } catch (error) {
      return {error: "Server Error! Kod(311)"};
    }
  },
  getAllCathedraByFaculty: async (
    _: any,
    {name, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const allCathedra = await Cathedra.findAll({
        where: {faculty: name},
        order: [["id", "DESC"]]
      });

      const returnPage = pagination(allCathedra, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(312)"};
    }
  },
  getAllCathedra: async (_: any, {page, itemsPerPage}: any, context: any) => {
    try {
      const allCathedra = await Cathedra.findAll({order: [["id", "DESC"]]});

      const returnPage = pagination(allCathedra, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(312)"};
    }
  }
};
