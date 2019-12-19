import bcryptjs from "bcryptjs";
import {passwordValidation, validationUserData} from "./_validationAuth";
//import Email from "./email";
import {User, UserInformation} from "../../../database/models";
import {isDevelopment} from "../../../config";

export default {
  startRegister: async (_: any, {name, surname, email, platform}: any) => {
    try {
      const validationError = await validationUserData({
        name,
        surname,
        email
      });
      if (validationError) return {error: validationError};

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

      await User.create({
        name,
        surname,
        email
      });

      // send letter

      return {
        message: `Please go to your mail: ${email} and confirm registration!`
      };
    } catch (error) {
      if (isDevelopment) console.log(error);
      return {error: "Server error! Kod(001)"};
    }
  },

  finishRegister: async (_: any, {id, password}: any) => {
    try {
      const validationError = await passwordValidation({
        password
      });
      if (validationError) return {error: validationError};

      const user = await User.findOne({where: {id}});
      if (!user || user.confirmed)
        return {error: "This feature is not available!"};

      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);

      await user.update({
        confirmed: true,
        password: hashPassword
      });
      await UserInformation.create({
        owner: user.id
      });
      return {message: "Registration was successful!"};
    } catch (error) {
      if (isDevelopment) console.log(error);
      return {error: "Server error! Kod(002)"};
    }
  }
};
