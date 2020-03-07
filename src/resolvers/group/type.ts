import { Cathedra, File, UserInformation, User } from '../../database/models';
import { logError } from '../../lib/logger';

export default {
  group: {
    cathedra: async (parent: any, args: any, context: any) => {
      try {
        return await Cathedra.findOne({ where: { id: parent.cathedra } });
      } catch (error) {
        logError(error.message, __dirname, 'cathedra');
        return null;
      }
    },
    fails: async (parent: any, args: any, context: any) => {
      try {
        return await File.findAll({ where: { owner: parent.id } });
      } catch (error) {
        logError(error.message, __dirname, 'fails');
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
        logError(error.message, __dirname, 'people');
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
