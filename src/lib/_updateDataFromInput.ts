import _ from "lodash";

export const updateArr = <T>(
  oldArr: T[],
  newArr: T[]
): {deleteArr: T[]; saveArr: T[]} | undefined => {
  if (_.isEqual(oldArr, newArr)) return undefined;
  return {
    deleteArr: _.difference(oldArr, newArr),
    saveArr: _.difference(newArr, oldArr)
  };
};
