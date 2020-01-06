import jwt from "jsonwebtoken";
import {SECRET} from "../../../../config";

const verifyToken = (context: any): string | undefined => {
  const token: string | undefined = context.req.header("auth-token");
  if (!token) {
    return "Access Denied!";
  }
  try {
    const verified = <any>jwt.verify(String(token), String(SECRET));
    context.res.locals.user = {
      id: verified.id,
      email: verified.email
    };
    return undefined;
  } catch (error) {
    return "Invalid Token!";
  }
};

export default verifyToken;
