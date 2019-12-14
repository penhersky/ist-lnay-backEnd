import groupType from "./type";
import groupQuery from "./Query";
import mutationGroup from "./Mutation";

export const GroupTypes = {
  ...groupType,
  queryGroup: groupQuery,
  mutationGroup
};

export const GroupQuery = {
  Group: groupQuery.getGroup
};

export const groupMutation = {
  Group: mutationGroup.addGroup
};
