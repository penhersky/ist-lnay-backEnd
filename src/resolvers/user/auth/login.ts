import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {User} from "../../../database/models";
import {loginValidation} from "./_validationAuth";
import {SECRET} from "../../../config";
import log from "../../../lib/logger";
import _ from "lodash";

export default async (paent: any, {email, password}: any) => {
  try {
    const validationError = await loginValidation({email, password});
    if (validationError) return {error: validationError};

    const user = await User.findOne({where: {email}});
    if (!user) return {error: "User is not found!"};

    if (!user.confirmed)
      return {error: "You have not completed your registration!"};

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) return {error: "Invalid password!"};

    const mainToken = jwt.sign({id: user.id, email}, SECRET, <any>{
      expiresIn: "31d"
    });
    const weeklyToken = jwt.sign({id: user.id, email}, SECRET, <any>{
      expiresIn: "7d"
    });
    const dayToken = jwt.sign({id: user.id, email}, SECRET, <any>{
      expiresIn: "1d"
    });

    return {
      message: "Authorization was successful!",
      mainToken,
      weeklyToken,
      dayToken,
      user: _.omit(user.dataValues, ["password"])
    };
  } catch (error) {
    log.error(error.message, {
      path: __filename,
      object: "login"
    });
    return {error: "Server error! Kod(003)"};
  }
};
