import user from "./user";

export default {
  Query: {
    login: user.login,
    forgotPasswordStart: user.forgotPassword.forgotPasswordStart
  },

  Mutation: {
    ...user.register,
    forgotPasswordFinish: user.forgotPassword.forgotPasswordFinish
  }
};
