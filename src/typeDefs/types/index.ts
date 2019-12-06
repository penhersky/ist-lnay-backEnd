import {concatenateTypeDefs} from "apollo-server-express";

import result from "./result";
import {typeGroup, groupQuery, groupMutation} from "./group";
import {typeCathedra, cathedraQuery, cathedraMutation} from "./cathedra";

import {typeUser} from "./user/userType";
import userQuery from "./user/userQuery";
import userMutation from "./user/userMutation";

export const types = concatenateTypeDefs([
  result,
  typeUser,
  typeGroup,
  typeCathedra
]);
export const typeQuery = concatenateTypeDefs([
  userQuery,
  groupQuery,
  cathedraQuery
]);
export const typeMutation = concatenateTypeDefs([
  userMutation,
  groupMutation,
  cathedraMutation
]);
