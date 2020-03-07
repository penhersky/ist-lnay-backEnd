import { Cathedra, User, Image } from '../../database/models';
import verifyToken from '../user/auth/verification/verifyToken';
import verifyPosition from '../user/auth/verification/verifyPosition';
import log from '../../lib/logger/logger';
import { updateArr } from '../../lib/_updateDataFromInput';

export default {
  addCathedra: async (_: any, { input }: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return { error: authError, redirect: true };

      const user = await User.findOne({
        where: { id: context.res.locals.user.id },
      });

      if (!verifyPosition(user.position, 'Head of Cathedra'))
        return { error: 'You do not have access to this action!' };

      const newCathedra = await Cathedra.create({
        name: input.name,
        faculty: input.faculty,
        information: input.information,
        mainImage: input.mainImage,
      });
      if (input.images) {
        await input.image.map(async (image: string) => {
          await Image.create({
            path: image,
            owner: newCathedra.id,
          });
        });
      }

      return newCathedra;
    } catch (error) {
      log.error(error.message, { path: __filename, object: 'addCathedra' });
      return { error: 'Server Error! Kod(321)' };
    }
  },
  updateCathedra: async (_: any, { id, input }: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return { error: authError, redirect: true };

      const user = await User.findOne({
        where: { id: context.res.locals.user.id },
      });

      if (!verifyPosition(user.position, 'Head of Cathedra'))
        return { error: 'You do not have access to this action!' };

      const cathedra = await Cathedra.findOne({ where: { id } });
      if (!cathedra) return { error: 'Cathedra is not found!' };

      const updatedCathedra = cathedra.update({
        name: input.name,
        faculty: input.faculty,
        mainImage: input.mainImage,
        information: input.information,
      });

      const oldImages = await Image.findAll({ where: { owner: cathedra.id } });
      const resultImages = updateArr(oldImages, input.images);

      if (resultImages) {
        if (resultImages.deleteArr) {
          resultImages.deleteArr.map(
            async (image: any) =>
              await Image.destroy({
                where: { id: image.id },
              }),
          );
        }
        if (resultImages.saveArr) {
          resultImages.saveArr.map(
            async (image: any) =>
              await Image.create({ path: image, owner: user.id }),
          );
        }
      }
      return updatedCathedra;
    } catch (error) {
      log.error(error.message, { path: __filename, object: 'updateCathedra' });
      return { error: 'Server Error! Kod(322)' };
    }
  },
  deleteCathedra: async (_: any, { id }: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return { error: authError, redirect: true };

      const user = await User.findOne({
        where: { id: context.res.locals.user.id },
      });

      if (!verifyPosition(user.position, 'Head of Cathedra'))
        return { error: 'You do not have access to this action!' };

      await Cathedra.destroy({ where: { id } });
      await Image.destroy({ where: { owner: id } });

      return { message: 'Cathedra deleted!' };
    } catch (error) {
      log.error(error.message, { path: __filename, object: 'deleteCathedra' });
      return { error: 'Server Error! Kod(322)' };
    }
  },
};
