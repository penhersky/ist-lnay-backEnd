import { Cathedra } from '../../database/models';
import pagination from '../pagination';
import { serverError } from '../../lib/logger';

export default {
  getCathedra: async (_: any, { id }: any, context: any) => {
    try {
      const cathedra = await Cathedra.findOne({ where: { id } });
      if (!cathedra) return { error: 'Cathedra is not found!' };
      return cathedra;
    } catch (error) {
      return serverError(error.message, __dirname, 'getCathedra');
    }
  },
  getAllCathedraByFaculty: async (
    _: any,
    { name, page, itemsPerPage }: any,
    context: any,
  ) => {
    try {
      const allCathedra = await Cathedra.findAll({
        where: { faculty: name },
        order: [['id', 'DESC']],
      });

      const returnPage = pagination(allCathedra, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr,
      };
    } catch (error) {
      return serverError(error.message, __dirname, 'getAllCathedraByFaculty');
    }
  },
  getAllCathedra: async (_: any, { page, itemsPerPage }: any, context: any) => {
    try {
      const allCathedra = await Cathedra.findAll({ order: [['id', 'DESC']] });

      const returnPage = pagination(allCathedra, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr,
      };
    } catch (error) {
      return serverError(error.message, __dirname, 'getAllCathedra');
    }
  },
};
