import {User} from "../../database/models";
import log from "../../lib/logger";

export default {
  File: {
    owner: async (parent: any, args: any, context: any) => {
      try {
        return await User.findOne({where: {id: parent.owner}});
      } catch (error) {
        log.error(error.message, {path: __filename, object: "File"});
        return {error: "Server Error! Kod(401)"};
      }
    }
  },
  fileRes: {
    __resolveType(obj: any, context: any, info: any): string | null {
      if (obj.message || obj.error) {
        return "result";
      }

      if (obj.id) {
        return "File";
      }

      return null;
    }
  }
};
