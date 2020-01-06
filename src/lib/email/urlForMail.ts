import jwt from "jsonwebtoken";
import {SECRET} from "../../config";

export const createURL = (
  id: number,
  email: string,
  path: string,
  context: any
) => {
  const searchParams = new URLSearchParams("");
  searchParams.append("id", id.toString());
  const key = jwt.sign({id, email}, SECRET, <any>{
    expiresIn: "1h"
  });
  searchParams.append("key", key);
  return `${context.req.headers.origin}${path}/${searchParams.toString()}`;
};

export const verifyKey = (
  key: string
): undefined | {id: number; email: string} => {
  try {
    return <any>jwt.verify(String(key), String(SECRET));
  } catch (error) {
    return undefined;
  }
};
