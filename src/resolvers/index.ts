import user, {UserTypes, UserQuery, userMutation} from "./user";

export default {
  Query: {
    ...UserQuery
  },

  Mutation: {
    ...userMutation
  },
  ...UserTypes
};
