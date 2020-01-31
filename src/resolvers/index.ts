import {UserTypes, UserQuery, userMutation} from "./user";
import {GroupQuery, GroupTypes, groupMutation} from "./group";
import {cathedraQuery, cathedraTypes, cathedraMutation} from "./cathedra";
import {QueryFile, fileTypes, MutationFile} from "./file";
import {NewsMutation, NewsQuery, NewsTypes} from "./news";

export default Object.assign(
  {
    Query: Object.assign(
      UserQuery,
      GroupQuery,
      cathedraQuery,
      QueryFile,
      NewsQuery
    )
  },
  {
    Mutation: Object.assign(
      userMutation,
      groupMutation,
      cathedraMutation,
      MutationFile,
      NewsMutation
    )
  },
  UserTypes,
  GroupTypes,
  cathedraTypes,
  fileTypes,
  NewsTypes
);
