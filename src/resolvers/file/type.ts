import {User} from "../../database/models";

export default {
  File: {
    owner: async (parent: any, args: any, context: any) => {
      try {
        return await User.findOne({where: {id: parent.owner}});
      } catch (error) {
        return {error: "Server Error! Kod(401)"};
      }
    }
  },
  groupRes: {
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
