import {Group, User, Image} from "../../database/models";
import {groupInput} from "./_validationGroup";
import verifyToken from "../user/auth/verification/verifyToken";
import verifyPosition from "../user/auth/verification/verifyPosition";

export default {
  addGroup: async (_: any, {input}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};
      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });
      if (!verifyPosition(user.position, "Teacher"))
        return {error: "You do not have access to this action!"};

      const validationError = await groupInput({
        name: input.name,
        cathedra: input.cathedra,
        information: input.information
      });
      if (validationError) return {error: validationError};

      const newGroup = await Group.create({
        name: input.name,
        cathedra: input.cathedra,
        information: input.information
      });

      if (input.images) {
        await input.image.map(async (image: String) => {
          Image.create({
            path: image,
            owner: newGroup.id
          });
        });
      }

      return {
        id: newGroup.id,
        name: newGroup.name,
        cathedra: newGroup.cathedra,
        information: newGroup.information,
        images: input.Images,
        createdAt: newGroup,
        updatedAt: newGroup
      };
    } catch (error) {
      return {error: "Server Error! Kod(221)"};
    }
  },
  updateGroup: async (_: any, {id, input}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};
      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });
      if (!verifyPosition(user.position, "Teacher"))
        return {error: "You do not have access to this action!"};

      const validationError = await groupInput({
        name: input.name,
        cathedra: input.cathedra,
        information: input.information
      });
      if (validationError) return {error: validationError};
      const group = await Group.findOne({where: {id}});
      if (!group) return {error: "Group is not found!"};

      group.update({
        name: input.name,
        cathedra: input.cathedra,
        information: input.information
      });

      if (input.images) {
        await input.image.map(async (image: String) => {
          Image.create({
            path: image,
            owner: group.id
          });
        });
      }
      return {
        id: group.id,
        name: group.name,
        cathedra: group.cathedra,
        information: group.information,
        images: input.Images,
        createdAt: group,
        updatedAt: group
      };
    } catch (error) {
      return {error: "Server Error! Kod(222)"};
    }
  },
  deleteGroup: async (_: any, {id}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};
      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });
      if (!verifyPosition(user.position, "Teacher"))
        return {error: "You do not have access to this action!"};
      await Group.destroy({where: {id}});
      return {message: "Group deleted!"};
    } catch (error) {
      return {error: "Server Error! Kod(223)"};
    }
  }
};
