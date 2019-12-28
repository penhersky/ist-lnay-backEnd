import {File} from "../../database/models";
import log from "../../lib/logger";

export default {
  getFile: async (_: any, {id}: any, context: any) => {
    try {
      return await File.findOne({where: {id}});
    } catch (error) {
      log.error(error.message, {path: __filename, object: "getFile"});
      return {error: "Server Error! Kod(411)"};
    }
  },
  getFileByGroupId: async (_: any, {id}: any, context: any) => {
    try {
      return await File.findAll({where: {owner: id}});
    } catch (error) {
      log.error(error.message, {path: __filename, object: "getFileByGroupID"});
      return {error: "Server Error! Kod(412)"};
    }
  },
  getFiles: async (_: any, args: any, context: any) => {
    try {
      return await File.findAll();
    } catch (error) {
      log.error(error.message, {path: __filename, object: "getFiles"});
      return {error: "Server Error! Kod(413)"};
    }
  }
};
