import bcrypt from "bcryptjs";
//import mail from "./_email";
import {User} from "../../../database/models";
import {validationEmail, passwordValidation} from "./_validationAuth";
import {isDevelopment} from "../../../config";

export default {
  forgotPasswordStart: async (_: any, {email}: any) => {
    try {
      const validationError = await validationEmail({email});
      if (validationError) return {error: validationError};

      const user = await User.findOne({where: {email}});
      if (!user || !user.confirmed)
        return {error: "User does not exist or is not verified!"};

      // send letter

      return {
        message: `Please go to your mail: ${email} and confirm registration!`
      };
    } catch (error) {
      if (isDevelopment) console.log(error);
      return {error: "Server error! Kod(004)"};
    }
  },
  forgotPasswordFinish: async (_: any, {id, newPassword}: any) => {
    try {
      const validationError = await passwordValidation({password: newPassword});
      if (validationError) return {error: validationError};

      const user = await User.findByPk(id);
      if (!user) return {error: "User is not found!"};

      const comparedPassword = await bcrypt.compare(newPassword, user.password);
      if (comparedPassword) return {error: "Passwords should not be the same!"};

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      await user.update({
        password: hashPassword
      });
      return {message: "Password change successful!"};
    } catch (error) {
      if (isDevelopment) console.log(error);
      return {error: "Server error! Kod(005)"};
    }
  }
};
