import _ from 'lodash';
import { FileNews, News, User } from '../../database/models';
import verifyToken from '../user/auth/verification/verifyToken';
import verifyPosition from '../user/auth/verification/verifyPosition';
import { newsInput } from './_validationNews';
import { serverError } from '../../lib/logger';
import { updateArr } from '../../lib/_updateDataFromInput';

export default {
  addNews: async (parent: any, { input }: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return { error: authError, redirect: true };
      const user = await User.findOne({
        where: { id: context.res.locals.user.id },
      });
      if (!verifyPosition(user.position, 'Teacher'))
        return { error: 'You do not have access to this action!' };

      const newsToSave = _.pick(input, [
        'title',
        'body',
        'group',
        'cathedra',
        'video',
      ]);

      const validationError = await newsInput({
        ...newsToSave,
        author: user.id,
      });
      if (validationError) return { error: validationError };

      const news = await News.create(newsToSave);

      if (input.images) {
        await input.images.map(
          async (image: string) =>
            await FileNews.create({
              path: image,
              news: news.id,
              type: 'image',
            }),
        );
      }
      if (input.files) {
        await input.files.map(
          async (file: string) =>
            await FileNews.create({ path: file, news: news.id, type: 'file' }),
        );
      }

      return news;
    } catch (error) {
      return serverError(error.message, __dirname, 'addNews');
    }
  },
  updateNews: async (parent: any, { id, input }: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return { error: authError, redirect: true };
      const user = await User.findOne({
        where: { id: context.res.locals.user.id },
      });
      const news = await News.findOne({ where: { id } });
      if (!news) return { error: 'News is not Found!' };

      if (news.author !== user.id) {
        if (!verifyPosition(user.position, 'admin'))
          return { error: 'You do not have access to this action!' };
      }

      const newsForChange = _.pick(input, [
        'title',
        'body',
        'group',
        'cathedra',
        'video',
      ]);
      const updatedNews = await news.update(newsForChange);

      const oldFiles = await FileNews.findAll({
        where: { news: news.id, type: 'file' },
      });
      const oldImage = await FileNews.findAll({
        where: { news: news.id, type: 'image' },
      });

      const resultImages = updateArr(oldImage, input.images);
      if (resultImages) {
        if (resultImages.deleteArr) {
          resultImages.deleteArr.map(
            async (image: any) =>
              await FileNews.destroy({
                where: { news: news.id, type: 'image', path: image },
              }),
          );
        }
        if (resultImages.saveArr) {
          resultImages.saveArr.map(
            async (image: any) =>
              await FileNews.create({
                type: 'image',
                path: image,
                news: news.id,
              }),
          );
        }
      }

      const resultFiles = updateArr(oldFiles, input.files);
      if (resultFiles) {
        if (resultFiles.deleteArr) {
          resultFiles.deleteArr.map(
            async (file: any) =>
              await FileNews.destroy({
                where: { news: news.id, type: 'file', path: file },
              }),
          );
        }
        if (resultFiles.saveArr) {
          resultFiles.saveArr.map(
            async (file: any) =>
              await FileNews.create({
                type: 'file',
                path: file,
                news: news.id,
              }),
          );
        }
      }

      return updatedNews;
    } catch (error) {
      return serverError(error.message, __dirname, 'updateNews');
    }
  },
  deleteNews: async (parent: any, { id }: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return { error: authError, redirect: true };
      const user = await User.findOne({
        where: { id: context.res.locals.user.id },
      });
      const news = await News.findOne({ where: { id } });
      if (!news) return { error: 'News is not Found!' };

      if (news.author !== user.id) {
        if (!verifyPosition(user.position, 'admin'))
          return { error: 'You do not have access to this action!' };
      }

      await News.destroy({ where: { id } });
      await FileNews.destroy({ where: { news: news.id } });

      return { message: 'News Deleted!' };
    } catch (error) {
      return serverError(error.message, __dirname, 'addNews');
    }
  },
};
