import {Cathedra} from "../../database/models";

export default {
  getCathedra: async (_: any, {id}: any, context: any) => {
    try {
      const cathedra = await Cathedra.findOne({where: {id}});
      if (!cathedra) return {error: "Cathedra is not found!"};
      return cathedra;
    } catch (error) {
      return {error: "Server Error! Kod(311)"};
    }
  },
  getAllCathedraByFaculty: async (_: any, {name}: any, context: any) => {
    try {
      return await Cathedra.findAll({where: {faculty: name}});
    } catch (error) {
      return {error: "Server Error! Kod(312)"};
    }
  },
  getAllCathedra: async (_: any, args: any, context: any) => {
    try {
      return await Cathedra.findAll();
    } catch (error) {
      return {error: "Server Error! Kod(312)"};
    }
  }
};
