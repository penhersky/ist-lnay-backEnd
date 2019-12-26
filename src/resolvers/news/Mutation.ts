import _ from "lodash";
import {FileNews, News, User} from "../../database/models";
import verifyToken from "../user/auth/verification/verifyToken";
import verifyPosition from "../user/auth/verification/verifyPosition";
import {newsInput} from "./_validationNews";
import log from "../../lib/logger";

export default {
  addNews: async (parent: any, {input}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};
      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });
      if (!verifyPosition(user.position, "Teacher"))
        return {error: "You do not have access to this action!"};

      const newsToSave = _.pick(input, [
        "title",
        "body",
        "author",
        "group",
        "cathedra",
        "video"
      ]);

      const validationError = await newsInput(newsToSave);
      if (validationError) return {error: validationError};

      const news = await News.create(newsToSave);

      if (input.images) {
        await input.images.map(
          async (image: string) =>
            await FileNews.create({path: image, news: news.id, type: "image"})
        );
      }
      if (input.files) {
        await input.files.map(
          async (file: string) =>
            await FileNews.create({path: file, news: news.id, type: "file"})
        );
      }

      return news;
    } catch (error) {
      log.error(error.message, {path: __filename, object: "addNews"});
      return {error: "Server Error! Kod(531)"};
    }
  },
  deleteNews: async (parent: any, {id}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};
      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });
      const news = await News.findOne({where: {id}});
      if (!news) return {error: "News is not Found!"};

      if (news.author !== user.id) {
        if (!verifyPosition(user.position, "admin"))
          return {error: "You do not have access to this action!"};
      }

      await News.destroy({where: {id}});
      await FileNews.destroy({where: {news: news.id}});

      return {message: "News Deleted!"};
    } catch (error) {
      log.error(error.message, {path: __filename, object: "deleteNews"});
      return {error: "Server Error! Kod(534)"};
    }
  }
};
