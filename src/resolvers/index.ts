import {UserTypes, UserQuery, userMutation} from "./user";
import {GroupQuery, GroupTypes, groupMutation} from "./group";

export default {
  Query: {
    ...UserQuery,
    ...GroupQuery
  },

  Mutation: {
    ...userMutation,
    ...groupMutation
  },
  ...UserTypes,
  ...GroupTypes
};
