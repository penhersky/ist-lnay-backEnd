import {Group, Cathedra, UserInformation} from "../../../database/models";

export const additionalInformationUser = {
  group: {
    group: async (parent: any, args: any, context: any) => {
      try {
        console.log(parent);
        return await Group.findOne({where: {id: parent.group}});
      } catch (error) {
        return {error: "Server Error!"};
      }
    }
  },
  cathedra: async (parent: any, args: any, context: any) => {
    try {
      return await Cathedra.findOne({where: {id: parent.group}});
    } catch (error) {
      return {error: "Server Error!"};
    }
  }
};

export const user = {
  additionalInformation: async (parent: any, args: any, context: any) => {
    try {
      return await UserInformation.findOne({where: {owner: parent.id}});
    } catch (error) {
      return {error: "Server Error!"};
    }
  }
};

export const userRes = {
  __resolveType(obj: any, context: any, info: any) {
    if (obj.message || obj.error) {
      return "result";
    }

    if (obj.id) {
      return "user";
    }

    return null;
  }
};
