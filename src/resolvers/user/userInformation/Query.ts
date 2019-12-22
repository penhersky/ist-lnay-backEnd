import {User, UserInformation} from "../.../../../../database/models";
import pagination from "../../pagination";

export default {
  getUser: async (_: any, args: any, context: any) => {
    try {
      const user = await User.findOne({where: {id: args.id}});
      if (!user) return {message: "user is not found"};
      return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        position: user.position,
        confirmed: user.confirmed,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    } catch (error) {
      return {error: "Server Error! Kod(111)"};
    }
  },
  getUsers: async (_: any, {page, itemsPerPage}: any, context: any) => {
    try {
      const users = await User.findAll();
      const resUser = users.map((user: any) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        position: user.position,
        confirmed: user.confirmed,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
      const returnPage = pagination(resUser, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        users: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(112)"};
    }
  },
  getUsersByGroupID: async (
    _: any,
    {id, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const UsersInformation = await UserInformation.findAll({
        where: {group: id}
      });
      const resUser = await UsersInformation.map(
        async (userInformation: any) =>
          await User.findOne({where: {id: userInformation.owner}})
      );
      const returnPage = pagination(resUser, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        users: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(113)"};
    }
  },
  getUsersByCathedraID: async (
    _: any,
    {id, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const UsersInformation = await UserInformation.findAll({
        where: {cathedra: id}
      });
      const resUser = await UsersInformation.map(
        async (userInformation: any) =>
          await User.findOne({where: {id: userInformation.owner}})
      );
      const returnPage = pagination(resUser, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        users: returnPage.arr
      };
    } catch (error) {
      return {error: "Server Error! Kod(114)"};
    }
  }
};
