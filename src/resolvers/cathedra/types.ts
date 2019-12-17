import {Image} from "../../database/models";

export default {
  cathedra: {
    images: async (parent: any, args: any, context: any) => {
      try {
        const files = await Image.findAll({where: {owner: parent.id}});
        return files.map((file: any) => file.path);
      } catch (error) {
        return {error: "Server Error! Kod(301)"};
      }
    }
  },
  groupRes: {
    __resolveType(obj: any, context: any, info: any) {
      if (obj.message || obj.error) {
        return "result";
      }

      if (obj.id) {
        return "cathedra";
      }

      return null;
    }
  }
};
