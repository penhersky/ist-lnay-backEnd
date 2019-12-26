import {Cathedra, User, Image} from "../../database/models";
import verifyToken from "../user/auth/verification/verifyToken";
import verifyPosition from "../user/auth/verification/verifyPosition";
import log from "../../lib/logger";

export default {
  addCathedra: async (_: any, {input}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};

      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });

      if (!verifyPosition(user.position, "Head of Cathedra"))
        return {error: "You do not have access to this action!"};

      const newCathedra = await Cathedra.create({
        name: input.name,
        faculty: input.faculty,
        information: input.information
      });
      if (input.images) {
        await input.image.map(async (image: string) => {
          await Image.create({
            path: image,
            owner: newCathedra.id
          });
        });
      }

      return {
        id: newCathedra.id,
        name: newCathedra.name,
        faculty: newCathedra.faculty,
        information: newCathedra.information,
        Images: input.Images,
        createdAt: newCathedra.createdAt,
        updatedAt: newCathedra.updatedAt
      };
    } catch (error) {
      log.error(error.message, {path: __filename, object: "addCathedra"});
      return {error: "Server Error! Kod(321)"};
    }
  },
  updateCathedra: async (_: any, {id, input}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};

      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });

      if (!verifyPosition(user.position, "Head of Cathedra"))
        return {error: "You do not have access to this action!"};

      const cathedra = await Cathedra.findOne({where: {id}});
      if (!cathedra) return {error: "Cathedra is not found!"};

      cathedra.update({
        name: input.name,
        faculty: input.faculty,
        information: input.information
      });
      if (input.images) {
        await input.image.map(async (image: string) => {
          await Image.findOrCreate({
            where: {path: image, owner: cathedra.id},
            defaults: {
              path: image,
              owner: cathedra.id
            }
          });
        });
      }
      return {
        id: cathedra.id,
        name: cathedra.name,
        faculty: cathedra.faculty,
        information: cathedra.information,
        Images: input.Images,
        createdAt: cathedra.createdAt,
        updatedAt: cathedra.updatedAt
      };
    } catch (error) {
      log.error(error.message, {path: __filename, object: "updateCathedra"});
      return {error: "Server Error! Kod(322)"};
    }
  },
  deleteCathedra: async (_: any, {id}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};

      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });

      if (!verifyPosition(user.position, "Head of Cathedra"))
        return {error: "You do not have access to this action!"};

      await Cathedra.destroy({where: {id}});
      await Image.destroy({where: {owner: id}});

      return {message: "Cathedra deleted!"};
    } catch (error) {
      log.error(error.message, {path: __filename, object: "deleteCathedra"});
      return {error: "Server Error! Kod(322)"};
    }
  }
};
