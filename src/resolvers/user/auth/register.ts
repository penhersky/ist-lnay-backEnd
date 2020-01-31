import bcryptjs from "bcryptjs";
import {passwordValidation, validationUserData} from "./_validationAuth";
//import Email from "./email";
import {User, UserInformation} from "../../../database/models";
import {createURL, verifyKey} from "../../../lib/email/urlForMail";
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
      if (validationError) return {error: validationError};

      const validationPasswordError = await passwordValidation({
        password
      });
      if (validationPasswordError) return {error: validationPasswordError};

      const UserCheckEmail = await User.findOne({where: {email}});
      if (UserCheckEmail) {
        if (UserCheckEmail.confirmed) {
          return {
            error:
              '"email"Користувач з даною електронною поштою уже підтвердив свій обліковий запис'
          };
        }

        const url = createURL(
          UserCheckEmail.id,
          email,
          "/api/finishRegistration",
          context
        );
        console.log(url);
        // send letter
        return {
          message: `Лист повторно відправлено! "${UserCheckEmail.email}"`
        };
      }

      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);

      const user = await User.create({
        name,
        surname,
        email,
        password: hashPassword,
        position: "user"
      });

      const url = createURL(user.id, email, "/api/finishRegistration", context);

      // send letter

      return {
        message: `Перейдіть на електронну пошту: ${email} та підтвердіте реєстрацію!`
      };
    } catch (error) {
      log.error(error.message, {
        path: __filename,
        object: "startRegistration"
      });
      return {error: "Server error! Kod(001)"};
    }
  },

  finishRegister: async (_: any, {key}: any) => {
    try {
      const keyResult = verifyKey(key);
      if (!keyResult) return {error: "Термін дії ключа вийшов!"};

      const user = await User.findOne({where: {id: keyResult.id}});
      if (keyResult.email == user.email) {
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
