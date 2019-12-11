import {Group, Cathedra, UserInformation} from "../../../database/models";

export const additionalInformationUser = {
  group: {
    group: async (parent: any, args: any, context: any) => {
      try {
        return await Group.findOne({where: {id: parent.group}});
      } catch (error) {
        return {error: "Server Error! Kod(101)"};
      }
    }
  },
  cathedra: async (parent: any, args: any, context: any) => {
    try {
      return await Cathedra.findOne({where: {id: parent.cathedra}});
    } catch (error) {
      return {error: "Server Error! Kod(102)"};
    }
  }
};

export const user = {
  additionalInformation: async (parent: any, args: any, context: any) => {
    try {
      return await UserInformation.findOne({
        where: {id: parent.additionalInformation}
      });
    } catch (error) {
      return {error: "Server Error! Kod(103)"};
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
