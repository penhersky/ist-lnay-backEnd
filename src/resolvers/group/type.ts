import {Cathedra, File, UserInformation, User} from "../../database/models";

export default {
  group: {
    cathedra: async (parent: any, args: any, context: any) => {
      try {
        return await Cathedra.findOne({where: {id: parent.cathedra}});
      } catch (error) {
        return null;
      }
    },
    fails: async (parent: any, args: any, context: any) => {
      try {
        return await File.findAll({where: {owner: parent.id}});
      } catch (error) {
        return [];
      }
    },
    people: async (parent: any, args: any, context: any) => {
      try {
        const usersInformation = await UserInformation.findAll({
          where: {group: parent.id}
        });
        return usersInformation.map(async (userInformation: any) => {
          return await User.findOne({where: {id: userInformation.owner}});
        });
      } catch (error) {
        return null;
      }
    }
  },

  groupRes: {
    __resolveType(obj: any, context: any, info: any): string | null {
      if (obj.message || obj.error) {
        return "result";
      }

      if (obj.id) {
        return "group";
      }

      return null;
    }
  }
};
