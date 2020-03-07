import { Group } from '../../database/models';
import pagination from '../pagination';
import { serverError } from '../../lib/logger';

export default {
  getGroup: async (_: any, { id }: any, context: any) => {
    try {
      const group = await Group.findOne({ where: { id } });
      if (!group) return { message: 'Group is not found!' };
      return group;
    } catch (error) {
      return serverError(error.message, __dirname, 'getGroup');
    }
  },
  getGroupsByCathedraId: async (_: any, { id, page, itemsPerPage }: any) => {
    try {
      const allGroup = await Group.findAll({
        where: { cathedra: id },
        order: [['id', 'DESC']],
      });
      const returnPage = pagination(allGroup, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr,
      };
    } catch (error) {
      return serverError(error.message, __dirname, 'getGroupByCathedraID');
    }
  },
  getGroups: async (_: any, { page, itemsPerPage }: any, context: any) => {
    try {
      const allGroup = await Group.findAll({ order: [['id', 'DESC']] });
      const returnPage = pagination(allGroup, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr,
      };
    } catch (error) {
      return serverError(error.message, __dirname, 'getGroups');
    }
  },
};
