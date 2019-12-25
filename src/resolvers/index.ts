import {UserTypes, UserQuery, userMutation} from "./user";
import {GroupQuery, GroupTypes, groupMutation} from "./group";
import {cathedraQuery, cathedraTypes, cathedraMutation} from "./cathedra";
import {QueryFile, fileTypes, MutationFile} from "./file";
import {NewsMutation, NewsQuery, NewsTypes} from "./news";

export default {
  Query: {
    ...UserQuery,
    ...GroupQuery,
    ...cathedraQuery,
    ...QueryFile,
    ...NewsQuery
  },

  Mutation: {
    ...userMutation,
    ...groupMutation,
    ...cathedraMutation,
    ...MutationFile,
    ...NewsMutation
  },
  ...UserTypes,
  ...GroupTypes,
  ...cathedraTypes,
  ...fileTypes,
  ...NewsTypes
};
