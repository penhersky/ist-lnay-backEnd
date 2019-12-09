import {Response} from "express";

export default (id: number, res: Response): String | undefined => {
  if (id === res.locals.user.id) {
    return undefined;
  }
  return "You do not own this account!";
};
