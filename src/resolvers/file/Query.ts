import { File } from '../../database/models';
import { serverError } from '../../lib/logger';

export default {
  getFile: async (_: any, { id }: any, context: any) => {
    try {
      return await File.findOne({ where: { id } });
    } catch (error) {
      return serverError(error.message, __dirname, 'getFile');
    }
  },
  getFileByGroupId: async (_: any, { id }: any, context: any) => {
    try {
      return await File.findAll({ where: { owner: id } });
    } catch (error) {
      return serverError(error.message, __dirname, 'addFileByGroupID');
    }
  },
  getFiles: async (_: any, args: any, context: any) => {
    try {
      return await File.findAll();
    } catch (error) {
      return serverError(error.message, __dirname, 'addFiles');
    }
  },
};
