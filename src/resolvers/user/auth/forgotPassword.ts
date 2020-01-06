import bcrypt from "bcryptjs";
//import mail from "./_email";
import {User} from "../../../database/models";
import {validationEmail, passwordValidation} from "./_validationAuth";
import {verifyKey, createURL} from "../../../lib/email/urlForMail";
import log from "../../../lib/logger";

export default {
  forgotPasswordStart: async (_: any, {email}: any, context: any) => {
    try {
      const validationError = await validationEmail({email});
      if (validationError) return {error: validationError};

      const user = await User.findOne({where: {email}});
      if (!user || !user.confirmed)
        return {error: "Користувача не існує або не підтверджений!"};

      const url = createURL(
        user.id,
        email,
        "/api/forgotPasswordFinish",
        context
      );

      // send letter

      return {
        message: `Перейдіть на електронну пошту: ${email} та активуйте створення нового паролю.`
      };
    } catch (error) {
      log.error(error.message, {
        path: __filename,
        object: "forgotPasswordStart"
      });
      return {error: "Server error! Kod(004)"};
    }
  },
  forgotPasswordFinish: async (_: any, {key, newPassword}: any) => {
    try {
      const keyResult = verifyKey(key);
      if (!keyResult) return {error: "Термін дії ключа вийшов!"};

      const validationError = await passwordValidation({password: newPassword});
      if (validationError) return {error: validationError};

      const user = await User.findByPk(keyResult.id);
      if (!user) return {error: "Користувача не знайдено!"};

      const comparedPassword = await bcrypt.compare(newPassword, user.password);
      if (comparedPassword)
        return {error: "Паролі не повинні бути однаковими!"};

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      await user.update({
        password: hashPassword
      });
      return {message: "Пароль успішно змінено!"};
    } catch (error) {
      log.error(error.message, {
        path: __filename,
        object: "forgotPasswordFinish"
      });
      return {error: "Server error! Kod(005)"};
    }
  }
};
