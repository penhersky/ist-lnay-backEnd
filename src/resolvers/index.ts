import user from "./user";

export default {
  Query: {
    login: user.login
  },

  Mutation: {
    ...user.register
  }
};
