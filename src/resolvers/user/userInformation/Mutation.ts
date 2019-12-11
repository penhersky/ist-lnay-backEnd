import bcrypt from "bcryptjs";

import {User, UserInformation} from "../../../database/models";
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
      return {error: "Server Error! Kod(121)"};
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
        if (!verifyPosition(actualUser.position, "admin"))
          return {error: "You do not have access to this action!"};
      }
      const changedUser = await User.findOne({where: {id}}); // ?

      const validationError = await validationUserData({
        name: input.name,
        surname: input.surname,
        email: input.email
      });
      if (validationError) return {error: validationError};

      const mailUser = await User.findOne({where: {email: input.email}});
      if (mailUser) return {error: 'A user with this "email" already exists!'};

      await changedUser.update({
        name: input.name,
        surname: input.surname,
        email: input.email
      });
      return {
        id: changedUser.id,
        name: changedUser.name,
        surname: changedUser.surname,
        position: changedUser.position,
        email: changedUser.email,
        updatedAt: changedUser.updatedAt,
        createdAt: changedUser.createdAt
      };
    } catch (error) {
      return {error: "Server Error! Kod(122)"};
    }
  },
  changePosition: async (_: any, {id, position}: any, context: any) => {
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
      const changedUser = await User.findOne({where: {id}});

      // check change rights
      if (
        !verifyPosition(actualUser.position, position) ||
        !verifyPosition(actualUser.position, changedUser.position)
      )
        return {
          error:
            'Your status is too low to perform this operation!(change "position")'
        };

      await changedUser.update({
        position: position
      });
      return {message: "The operation was successful!"};
    } catch (error) {
      return {error: "Server Error! Kod(123)"};
    }
  },
  updateAdditionalInformationByUserId: async (
    _: any,
    {id, input}: any,
    context: any
  ) => {
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
      const changedUserInformation = await User.findOne({where: {id}}); // ?

      await changedUserInformation.update({
        image: input.image,
        group: input.group,
        cathedra: input.cathedra,
        faculty: input.faculty,
        phonNumber: input.phonNumber,
        studentNumber: input.studentNumber,
        born: input.born,
        residence: input.residence,
        otherInformation: input.otherInformation
      });
      return {
        id: changedUserInformation.id,
        image: changedUserInformation.image,
        group: changedUserInformation.group,
        cathedra: changedUserInformation.cathedra,
        faculty: changedUserInformation.faculty,
        phonNumber: changedUserInformation.phonNumber,
        studentNumber: changedUserInformation.studentNumber,
        born: changedUserInformation.born,
        residence: changedUserInformation.residence,
        otherInformation: changedUserInformation.otherInformation
      };
    } catch (error) {
      return {error: "Server Error! Kod(124)"};
    }
  },
  deleteUser: async (_: any, {id}: any, context: any) => {
    try {
      const userAuthError = verifyToken(context);
      if (userAuthError) return {error: userAuthError, redirect: true};

      const actualUser = await User.findOne({
        where: {id: context.res.locals.user.id}
      });

      if (+actualUser.id !== +id) {
        if (!verifyPosition(actualUser.position, "admin"))
          return {error: "You do not have access to this action!"};
      }
      await User.destroy({where: {id}});
      await UserInformation.destroy({where: {owner: id}});
      return {error: "User deleted", redirect: +actualUser.id === +id};
    } catch (error) {
      return {error: "Server Error! Kod(125)"};
    }
  }
};
