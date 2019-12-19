import types from "./type";
import queryFile from "./Query";
import mutationFile from "./Mutation";

export const fileTypes = {
  ...types,
  queryFile,
  mutationFile
};

export const QueryFile = {
  File: queryFile.getFile
};

export const MutationFile = {
  File: mutationFile.addFile
};
