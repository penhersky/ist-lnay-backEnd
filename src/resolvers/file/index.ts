import types from "./type";
import queryFile from "./Query";
import mutationFile from "./Mutation";

export const fileTypes = {
  ...types,
  queryFile,
  mutationFile
};

export const QueryFile = {
  File: queryFile
};

export const MutationFile = {
  File: mutationFile
};
