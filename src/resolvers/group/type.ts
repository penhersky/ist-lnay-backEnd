import { Cathedra, File, UserInformation, User } from '../../database/models';
import log from '../../lib/logger/logger';

export default {
  group: {
    cathedra: async (parent: any, args: any, context: any) => {
      try {
        return await Cathedra.findOne({ where: { id: parent.cathedra } });
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'group' });
        return null;
      }
    },
    fails: async (parent: any, args: any, context: any) => {
      try {
        return await File.findAll({ where: { owner: parent.id } });
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'files' });
        return [];
      }
    },
    people: async (parent: any, args: any, context: any) => {
      try {
        const usersInformation = await UserInformation.findAll({
          where: { group: parent.id },
        });
        return usersInformation.map(async (userInformation: any) => {
          return await User.findOne({ where: { id: userInformation.owner } });
        });
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'people' });
        return null;
      }
    },
  },

  groupRes: {
    __resolveType(obj: any, context: any, info: any): string | null {
      if (obj.message || obj.error) {
        return 'result';
      }

      if (obj.id) {
        return 'group';
      }

      return null;
    },
  },
};
