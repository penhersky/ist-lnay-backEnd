import jwt from "jsonwebtoken";
import {SECRET, isDevelopment} from "../../../../config";

function verifyToken(context: any) {
  const token: string | undefined = context.req.header("auth-token");
  if (!token) {
    return {error: "Access Denied!"};
  }
  try {
    const verified = <any>jwt.verify(String(token), String(SECRET));
    context.res.locals.user = {
      id: verified.id,
      email: verified.email
    };
  } catch (error) {
    if (isDevelopment) console.error(error);
    return {error: "Invalid Token!"};
  }
}

export default verifyToken;
