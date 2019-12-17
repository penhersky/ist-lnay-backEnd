import {Cathedra, Image} from "../../database/models";

export default {
  getCathedra: async (_: any, {id}: any, context: any) => {
    try {
      const cathedra = await Cathedra.findOne({where: {id}});
      if (!cathedra) return {error: "Cathedra is not found!"};
      return await addImageToCathedra(cathedra);
    } catch (error) {
      return {error: "Server Error! Kod(311)"};
    }
  },
  getAllCathedraByFaculty: async (_: any, {name}: any, context: any) => {
    try {
      const allCathedra = await Cathedra.findAll({where: {faculty: name}});
      return await allCathedra.map(
        async (cathedra: any) => await addImageToCathedra(cathedra)
      );
    } catch (error) {
      return {error: "Server Error! Kod(312)"};
    }
  },
  getAllCathedra: async (_: any, args: any, context: any) => {
    try {
      const allCathedra = await Cathedra.findAll();
      return await allCathedra.map(
        async (cathedra: any) => await addImageToCathedra(cathedra)
      );
    } catch (error) {
      return {error: "Server Error! Kod(312)"};
    }
  }
};

const addImageToCathedra = async (cathedra: any) => {
  const images = await Image.findAll({where: {owner: cathedra.id}});
  return {
    id: cathedra.id,
    name: cathedra.name,
    faculty: cathedra.faculty,
    information: cathedra.information,
    Images: images.map((image: any) => image.path),
    createdAt: cathedra.createdAt,
    updatedAt: cathedra.updatedAt
  };
};
