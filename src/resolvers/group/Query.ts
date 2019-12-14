import {Group} from "../../database/models";

export default {
  getGroup: async (_: any, {id}: any, context: any) => {
    try {
      const group = await Group.findOne({where: {id}});
      if (!group) return {message: "Group is not found!"};
      return group;
    } catch (error) {
      return {error: "Server Error! Kod(211)"};
    }
  },
  getGroupsByCathedraId: async (_: any, {id}: any, context: any) => {
    try {
      return await Group.findAll({where: {cathedra: id}});
    } catch (error) {
      return {error: "Server Error! Kod(212)"};
    }
  },
  getGroups: async (_: any, args: any, context: any) => {
    try {
      return await Group.findAll();
    } catch (error) {
      return {error: "Server Error! Kod(213)"};
    }
  }
};
