import {Group, Image} from "../../database/models";

const addImageToGroup = async (cathedra: any): Promise<any> => {
  const image = await Image.findOne({where: {owner: cathedra.id}});
  return {
    id: cathedra.id,
    name: cathedra.name,
    faculty: cathedra.faculty,
    information: cathedra.information,
    image: image.path,
    createdAt: cathedra.createdAt,
    updatedAt: cathedra.updatedAt
  };
};

export default {
  getGroup: async (_: any, {id}: any, context: any) => {
    try {
      const group = await Group.findOne({where: {id}});
      if (!group) return {message: "Group is not found!"};
      return await addImageToGroup(group);
    } catch (error) {
      return {error: "Server Error! Kod(211)"};
    }
  },
  getGroupsByCathedraId: async (_: any, {id}: any, context: any) => {
    try {
      const allGroup = await Group.findAll({where: {cathedra: id}});
      return await allGroup.map(
        async (group: any) => await addImageToGroup(group)
      );
    } catch (error) {
      return {error: "Server Error! Kod(212)"};
    }
  },
  getGroups: async (_: any, args: any, context: any) => {
    try {
      const allGroup = await Group.findAll();
      return await allGroup.map(
        async (group: any) => await addImageToGroup(group)
      );
    } catch (error) {
      return {error: "Server Error! Kod(213)"};
    }
  }
};
