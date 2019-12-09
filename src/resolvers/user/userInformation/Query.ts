import {User, UserInformation} from "../.../../../../database/models";

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
      return {error: "Server Error! Kod(011)"};
    }
  },
  getUsers: async (_: any, args: any, context: any) => {
    try {
      const users = await User.findAll();
      return users.map((user: any) => ({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        position: user.position,
        confirmed: user.confirmed,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
    } catch (error) {
      return {error: "Server Error! Kod(012)"};
    }
  },
  getUsersByGroupID: async (_: any, {id}: any, context: any) => {
    try {
      const UsersInformation = await UserInformation.findAll({
        where: {group: id}
      });
      return await UsersInformation.map(
        async (userInformation: any) =>
          await User.findOne({where: {id: userInformation.owner}})
      );
    } catch (error) {
      return {error: "Server Error! Kod(013)"};
    }
  },
  getUsersByCathedraID: async (_: any, {id}: any, context: any) => {
    try {
      const UsersInformation = await UserInformation.findAll({
        where: {cathedra: id}
      });
      return await UsersInformation.map(
        async (userInformation: any) =>
          await User.findOne({where: {id: userInformation.owner}})
      );
    } catch (error) {
      return {error: "Server Error! Kod(014)"};
    }
  }
};
