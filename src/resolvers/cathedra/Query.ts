import {Cathedra, Image} from "../../database/models";
import pagination from "../pagination";

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
  getAllCathedraByFaculty: async (
    _: any,
    {name, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const allCathedra = await Cathedra.findAll({where: {faculty: name}});
      const allCathedraWithImg = await allCathedra.map(
        async (cathedra: any) => await addImageToCathedra(cathedra)
      );
      const returnPage = pagination(allCathedraWithImg, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(312)"};
    }
  },
  getAllCathedra: async (_: any, {page, itemsPerPage}: any, context: any) => {
    try {
      const allCathedra = await Cathedra.findAll();
      const allCathedraWithImg = await allCathedra.map(
        async (cathedra: any) => await addImageToCathedra(cathedra)
      );

      const returnPage = pagination(allCathedraWithImg, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        groups: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(312)"};
    }
  }
};
