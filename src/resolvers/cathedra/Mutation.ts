import {Cathedra, User} from "../../database/models";
import verifyToken from "../user/auth/verification/verifyToken";
import verifyPosition from "../user/auth/verification/verifyPosition";

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
      return newCathedra;
    } catch (error) {
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
      return cathedra;
    } catch (error) {
      return {error: "Server Error! Kod(322)"};
    }
  },
  deleteCathedra: async (_: any, {id, input}: any, context: any) => {
    try {
      const authError = verifyToken(context);
      if (authError) return {error: authError, redirect: true};

      const user = await User.findOne({
        where: {id: context.res.locals.user.id}
      });

      if (!verifyPosition(user.position, "Head of Cathedra"))
        return {error: "You do not have access to this action!"};

      const cathedra = await Cathedra.destroy({where: {id}});
      return {message: "Cathedra deleted!"};
    } catch (error) {
      return {error: "Server Error! Kod(322)"};
    }
  }
};
