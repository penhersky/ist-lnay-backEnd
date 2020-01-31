import register from "./auth/register";
import login from "./auth/login";
import forgotPassword from "./auth/forgotPassword";
import {
  additionalInformationUser,
  user,
  userRes
} from "./userInformation/userType";
import userQuery from "./userInformation/Query";
import mutationUser from "./userInformation/Mutation";

export default {
  register,
  forgotPassword
};

export const UserTypes = {
  user,
  additionalInformationUser,
  queryUser: userQuery,
  userRes,
  userMutation: mutationUser
};

export const UserQuery = {
  User: userQuery.getAuthorizedUser,
  login,
  forgotPasswordStart: forgotPassword.forgotPasswordStart
};

export const userMutation = {
  ...register,
  forgotPasswordFinish: forgotPassword.forgotPasswordFinish,
  User: mutationUser.changePassword
};
