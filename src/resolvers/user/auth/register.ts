import bcryptjs from "bcryptjs";
import {passwordValidation, validationUserData} from "./_validationAuth";
//import Email from "./email";
import {User, UserInformation} from "../../../database/models";
import log from "../../../lib/logger";

export default {
  startRegister: async (
    _: any,
    {name, surname, email, platform, password}: any,
    context: any
  ) => {
    try {
      const validationError = await validationUserData({
        name,
        surname,
        email
      });
      const validationPasswordError = await passwordValidation({
        password
      });
      if (validationError) return {error: validationError};
      if (validationPasswordError) return {error: validationError};

      const UserCheckEmail = await User.findOne({where: {email}});
      if (UserCheckEmail) {
        if (!UserCheckEmail.confirmed) {
          return {
            message: `Please go to your mail: ${email} and confirm registration!`
          };
        } else {
          return {
            error: `"email" already exists!`
          };
        }
      }

      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);

      const user = await User.create({
        name,
        surname,
        email,
        password: hashPassword
      });

      const searchParams = new URLSearchParams("");
      searchParams.append("id", user.id);
      const key = await bcryptjs.hash(user.email, salt);
      searchParams.append("id", user.id);
      searchParams.append("key", key);
      const letterLink = `${
        context.req.headers.origin
      }/api/finishRegistration/${searchParams.toString()}`;

      // send letter

      return {
        message: `Перейдіть на електронну пошту: ${email} та підтвердьте реєстрацію!`
      };
    } catch (error) {
      log.error(error.message, {
        path: __filename,
        object: "startRegistration"
      });
      return {error: "Server error! Kod(001)"};
    }
  },

  finishRegister: async (_: any, {id, key}: any) => {
    try {
      const user = await User.findOne({where: {id}});
      const verifyKey = await bcryptjs.compare(user.email, key);
      if (verifyKey) {
        if (!user || user.confirmed)
          return {error: "Профіль користувача уже підтверджений! "};

        user.update({
          confirmed: true
        });
        await UserInformation.create({
          owner: user.id
        });
        return {message: "Реєстрація пройшла успішно!"};
      }
      return {error: "Термін дії ключа вийшов!"};
    } catch (error) {
      log.error(error.message, {
        path: __filename,
        object: "finishRegistration"
      });
      return {error: "Server error! Kod(002)"};
    }
  }
};
