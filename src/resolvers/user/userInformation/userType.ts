import { Group, Cathedra, UserInformation } from '../../../database/models';
import log from '../../../lib/logger/logger';

export const additionalInformationUser = {
  group: {
    group: async (parent: any, args: any, context: any) => {
      try {
        return await Group.findOne({ where: { id: parent.group } });
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'group' });
        return { error: 'Server Error! Kod(101)' };
      }
    },
  },
  cathedra: async (parent: any, args: any, context: any) => {
    try {
      return await Cathedra.findOne({ where: { id: parent.cathedra } });
    } catch (error) {
      log.error(error.message, { path: __filename, object: 'cathedra' });
      return { error: 'Server Error! Kod(102)' };
    }
  },
};

export const user = {
  additionalInformation: async (parent: any, args: any, context: any) => {
    try {
      return await UserInformation.findOne({
        where: { id: parent.id },
      });
    } catch (error) {
      log.error(error.message, {
        path: __filename,
        object: 'additionalInformationUser',
      });
      return { error: 'Server Error! Kod(103)' };
    }
  },
};

export const userRes = {
  __resolveType(obj: any, context: any, info: any) {
    if (obj.message || obj.error) {
      return 'result';
    }

    if (obj.id) {
      return 'user';
    }

    return null;
  },
};
