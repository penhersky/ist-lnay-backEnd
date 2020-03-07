import { Cathedra } from '../../database/models';
import pagination from '../pagination';
import log from '../../lib/logger/logger';

export default {
  getCathedra: async (_: any, { id }: any, context: any) => {
    try {
      const cathedra = await Cathedra.findOne({ where: { id } });
      if (!cathedra) return { error: 'Cathedra is not found!' };
      return cathedra;
    } catch (error) {
      log.error(error.message, { path: __filename, object: 'getCathedra' });
      return { error: 'Server Error! Kod(311)' };
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
      log.error(error.message, {
        path: __filename,
        object: 'addCathedraByFaculty',
      });
      return { error: 'Server Error! Kod(312)' };
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
      log.error(error.message, { path: __filename, object: 'getAllCathedra' });
      return { error: 'Server Error! Kod(312)' };
    }
  },
};
