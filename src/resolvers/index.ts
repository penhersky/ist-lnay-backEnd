import {UserTypes, UserQuery, userMutation} from "./user";
import {GroupQuery, GroupTypes, groupMutation} from "./group";
import {cathedraQuery, cathedraTypes, cathedraMutation} from "./cathedra";
import {QueryFile, fileTypes, MutationFile} from "./file";

export default {
  Query: {
    ...UserQuery,
    ...GroupQuery,
    ...cathedraQuery,
    ...QueryFile
  },

  Mutation: {
    ...userMutation,
    ...groupMutation,
    ...cathedraMutation,
    ...MutationFile
  },
  ...UserTypes,
  ...GroupTypes,
  ...cathedraTypes,
  ...fileTypes
};
