import bcrypt from "bcryptjs";

import {User} from "../../../database/models";
import userIdentity from "../auth/verification/userIdentity";
import verifyToken from "../auth/verification/verifyToken";
import {passwordValidation, validationUserData} from "../auth/_validationAuth";
import verifyPosition from "../auth/verification/verifyPosition";

export default {
  changePassword: async (
    _: any,
    {id, oldPassword, password}: any,
    context: any
  ) => {
    try {
      const userAuthError = verifyToken(context);
      if (userAuthError) return {error: userAuthError, redirect: true};

      const userIdentityError = userIdentity(id, context.res);
      if (userIdentityError) return {error: userIdentityError};

      const validationPasswordError = await passwordValidation({password});
      if (validationPasswordError) return {error: validationPasswordError};
      const validationOldPasswordError = await passwordValidation({
        password: oldPassword
      });
      if (validationOldPasswordError)
        return {
          error: validationOldPasswordError.replace("password", "oldPassword")
        };

      const user = await User.findOne({where: {id}});

      const compareOldPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!compareOldPassword) return {error: '"oldPassword" is incorrect!'};

      if (user.password === password)
        return {
          error: 'The new "password" should not be the same as the old one!'
        };

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await user.update({
        password: hashPassword
      });
      return {message: "Password changed!"};
    } catch (error) {
      return {error: "Server Error! Kod(021)"};
    }
  },
  updateUser: async (_: any, {id, input}: any, context: any) => {
    try {
      const userAuthError = verifyToken(context);
      if (userAuthError) return {error: userAuthError, redirect: true};

      const actualUser = await User.findOne({
        where: {id: context.res.locals.user.id}
      });

      if (+actualUser.id !== +id) {
        if (!verifyPosition(actualUser.position, "Group leader"))
          return {error: "You do not have access to this action!"};
      }
      const changedUser = await User.findOne({where: {id}}); // ?

      const validationError = await validationUserData({
        name: input.name,
        surname: input.surname,
        email: input.email
      });
      if (validationError) return {error: validationError};

      // check change rights
      if (
        !verifyPosition(actualUser.position, input.position) ||
        !verifyPosition(actualUser.position, changedUser.position)
      )
        return {
          error:
            'Your status is too low to perform this operation!(change "position")'
        };

      const mailUser = await User.findOne({where: {email: input.email}});
      if (mailUser) return {error: 'A user with this "email" already exists!'};

      await changedUser.update({
        name: input.name,
        surname: input.surname,
        position: input.position,
        email: input.email
      });
      return {message: "The operation was successful!"};
    } catch (error) {
      return {error: "Server Error! Kod(022)"};
    }
  }
};
