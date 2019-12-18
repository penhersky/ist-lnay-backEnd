import {File, Group, User} from "../../database/models";
import verifyToken from "../user/auth/verification/verifyToken";
import verifyPosition from "../user/auth/verification/verifyPosition";

export default {
  addFile: async (_: any, {input}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};
      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });
      if (!verifyPosition(user.position, "Teacher"))
        return {error: "You do not have access to this action!"};

      return await File.create({
        name: input.name,
        owner: input.owner,
        path: input.path,
        information: input.information
      });
    } catch (error) {
      return {error: "Server Error! Kod(421)"};
    }
  },
  updateFile: async (_: any, {id, input}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};
      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });
      if (!verifyPosition(user.position, "Teacher"))
        return {error: "You do not have access to this action!"};

      const group = await Group.findOne({where: {id}});
      if (!group) return {error: "File is not Found!"};

      return await group.update({
        name: input.name,
        owner: input.owner,
        path: input.path,
        information: input.information
      });
    } catch (error) {
      return {error: "Server Error! Kod(422)"};
    }
  },
  deleteFile: async (_: any, {id}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};
      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });
      if (!verifyPosition(user.position, "Teacher"))
        return {error: "You do not have access to this action!"};

      await File.destroy({where: {id}});
      return {message: "File deleted!"};
    } catch (error) {
      return {error: "Server Error! Kod(223)"};
    }
  }
};
