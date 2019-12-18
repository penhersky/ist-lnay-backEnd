import {File} from "../../database/models";

export default {
  getFile: async (_: any, {id}: any, context: any) => {
    try {
      return await File.findOne({where: {id}});
    } catch (error) {
      return {error: "Server Error! Kod(411)"};
    }
  },
  getFileByGroupId: async (_: any, {id}: any, context: any) => {
    try {
      return File.findAll({where: {owner: id}});
    } catch (error) {
      return {error: "Server Error! Kod(412)"};
    }
  },
  getFiles: async (_: any, args: any, context: any) => {
    try {
      return File.findAll();
    } catch (error) {
      return {error: "Server Error! Kod(413)"};
    }
  }
};
