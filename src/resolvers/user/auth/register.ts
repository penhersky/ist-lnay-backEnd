import {
  finishRegisterValidation,
  startRegisterValidation
} from "./_validationAuth";
import {isDevelopment} from "../../../config";

export default {
  startRegister: async (_: any, {name, surname, email}: any) => {
    try {
      const validationError = await startRegisterValidation({
        name,
        surname,
        email
      });
      if (validationError) return {error: validationError};
      // ++
      return {message: "finish"};
    } catch (error) {
      if (isDevelopment) console.log(error);
      return {error: "Server error! Kod(001)"};
    }
  },

  finishRegister: async (_: any, {password}: any) => {
    try {
      const validationError = await finishRegisterValidation({
        password
      });
      if (validationError) return {error: validationError};
      // ++
      return {message: "finish"};
    } catch (error) {
      if (isDevelopment) console.log(error);
      return {error: "Server error! Kod(001)"};
    }
  }
};
