import _ from "lodash";
import {User, UserInformation} from "../.../../../../database/models";
import pagination from "../../pagination";
import log from "../../../lib/logger";

export default {
  getUser: async (parent: any, args: any, context: any) => {
    try {
      const user = await User.findOne({where: {id: args.id}});
      if (!user) return {message: "user is not found"};
      return _.omit(user.dataValues, ["password"]);
    } catch (error) {
      log.error(error.message, {path: __filename, object: "getUser"});
      return {error: "Server Error! Kod(111)"};
    }
  },
  getUsers: async (_: any, {page, itemsPerPage}: any, context: any) => {
    try {
      const users = await User.findAll({order: [["id", "DESC"]]});
      const returnPage = pagination(users, page, itemsPerPage);
      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        users: returnPage.arr
      };
    } catch (error) {
      log.error(error.message, {path: __filename, object: "getUsers"});
      return {error: "Server Error! Kod(112)"};
    }
  },
  getUserByEmail: async (parent: any, {email}: any, context: any) => {
    try {
      const user = await User.findOne({where: {email}});
      if (!user) return {message: "user is not found"};
      return _.omit(user.dataValues, ["password"]);
    } catch (error) {
      log.error(error.message, {path: __filename, object: "getUserByEmail"});
      return {error: "Server Error! Kod(113)"};
    }
  },
  getUsersByGroupID: async (
    _: any,
    {id, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const UsersInformation = await UserInformation.findAll({
        where: {group: id},
        order: [["id", "DESC"]]
      });
      const resUser = await UsersInformation.map(
        async (userInformation: any) =>
          await User.findOne({
            where: {id: userInformation.owner}
          })
      );
      const returnPage = pagination(resUser, page, itemsPerPage);

      return {
        countPage: returnPage.count,
        currentPage: returnPage.count ? page : undefined,
        users: returnPage.arr
      };
    } catch (error) {
      log.error(error.message, {path: __filename, object: "getUsersByGroupID"});
      return {error: "Server Error! Kod(114)"};
    }
  },
  getUsersByCathedraID: async (
    _: any,
    {id, page, itemsPerPage}: any,
    context: any
  ) => {
    try {
      const UsersInformation = await UserInformation.findAll({
        where: {cathedra: id},
        order: [["id", "DESC"]]
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
      log.error(error.message, {
        path: __filename,
        object: "getUsersByCathedraID"
      });
      return {error: "Server Error! Kod(115)"};
    }
  }
};
