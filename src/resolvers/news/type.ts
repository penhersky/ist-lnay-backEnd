import _ from 'lodash';
import { Cathedra, Group, User, FileNews } from '../../database/models';
import log from '../../lib/logger/logger';

export default {
  news: {
    author: async (parent: any, args: any, context: any) => {
      try {
        return await User.findOne({ where: { id: parent.author } });
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'author' });
        return null;
      }
    },
    group: async (parent: any, args: any, context: any) => {
      try {
        return await Group.findOne({ where: { id: parent.group } });
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'group' });
        return null;
      }
    },
    cathedra: async (parent: any, args: any, context: any) => {
      try {
        return await Cathedra.findOne({ where: { id: parent.cathedra } });
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'cathedra' });
        return null;
      }
    },
    images: async (parent: any, args: any, context: any) => {
      try {
        const allImages = await FileNews.findAll({
          where: { id: parent.cathedra, type: 'image' },
        });
        if (!allImages) return [];
        return _.map(allImages.dataValues, (image: any) =>
          _(allImages)
            .pick(image, ['path'])
            .value(),
        );
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'images' });
        return [];
      }
    },
    files: async (parent: any, args: any, context: any) => {
      try {
        const allFiles = await FileNews.findAll({
          where: { id: parent.cathedra, type: 'file' },
        });
        if (!allFiles) return [];
        return _.map(allFiles.dataValues, (file: any) =>
          _(allFiles)
            .pick(file, ['path'])
            .value(),
        );
      } catch (error) {
        log.error(error.message, { path: __filename, object: 'files' });
        return [];
      }
    },
  },
  newsRes: {
    __resolveType(obj: any, context: any, info: any): string | null {
      if (obj.message || obj.error) {
        return 'result';
      }

      if (obj.id) {
        return 'news';
      }

      return null;
    },
  },
};
