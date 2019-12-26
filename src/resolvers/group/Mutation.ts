import {Group, User, File} from "../../database/models";
import {groupInput} from "./_validationGroup";
import verifyToken from "../user/auth/verification/verifyToken";
import verifyPosition from "../user/auth/verification/verifyPosition";
import log from "../../lib/logger";

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
        image: input.image,
        information: input.information
      });

      return newGroup;
    } catch (error) {
      log.error(error.message, {path: __filename, object: "addGroup"});
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
        image: input.image,
        information: input.information
      });

      return group;
    } catch (error) {
      log.error(error.message, {path: __filename, object: "updateGroup"});
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
      await File.destroy({where: {owner: id}});
      return {message: "Group deleted!"};
    } catch (error) {
      log.error(error.message, {path: __filename, object: "deleteGroup"});
      return {error: "Server Error! Kod(223)"};
    }
  }
};
