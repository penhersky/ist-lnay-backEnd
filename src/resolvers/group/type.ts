import {Cathedra, File, UserInformation, User} from "../../database/models";

export default {
  group: {
    cathedra: async (parent: any, args: any, context: any) => {
      try {
        return await Cathedra.findOne({where: {id: parent.cathedra}});
      } catch (error) {
        return {error: "Server Error! Kod(201)"};
      }
    },
    fails: async (parent: any, args: any, context: any) => {
      try {
        return await File.findAll({where: {owner: parent.id}});
      } catch (error) {
        return {error: "Server Error! Kod(202)"};
      }
    },
    people: async (parent: any, args: any, context: any) => {
      const usersInformation = await UserInformation.findAll({
        where: {group: parent.id}
      });
      return usersInformation.map(async (userInformation: any) => {
        return await User.findOne({where: {id: userInformation.owner}});
      });
    }
  },

  groupRes: {
    __resolveType(obj: any, context: any, info: any) {
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
