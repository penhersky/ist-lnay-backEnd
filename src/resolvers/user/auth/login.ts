import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {User} from "../../../database/models";
import {loginValidation} from "./_validationAuth";
import {SECRET} from "../../../config";
import log from "../../../lib/logger";

export default async (_: any, {email, password}: any) => {
  try {
    const validationError = await loginValidation({email, password});
    if (validationError) return {error: validationError};

    const user = await User.findOne({where: {email}});
    if (!user) return {error: "User is not found!"};

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) return {error: "Invalid password!"};

    const token = jwt.sign({id: user.id, email}, SECRET);
    return {message: "Authorization was successful!", token};
  } catch (error) {
    log.error(error.message, {
      path: __filename,
      object: "login"
    });
    return {error: "Server error! Kod(003)"};
  }
};
