import bcrypt from "bcryptjs";

import {User} from "../../../database/models";
import userIdentity from "../auth/verification/userIdentity";
import verifyToken from "../auth/verification/verifyToken";
import {passwordValidation} from "../auth/_validationAuth";

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
  }
};
