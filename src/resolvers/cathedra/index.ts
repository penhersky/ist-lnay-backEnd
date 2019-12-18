import types from "./types";
import queryCathedra from "./Query";
import mutationCathedra from "./Mutation";

export const cathedraTypes = {
  ...types,
  queryCathedra,
  mutationCathedra
};

export const cathedraQuery = {
  Cathedra: queryCathedra.getCathedra
};

export const cathedraMutation = {
  Cathedra: mutationCathedra.addCathedra
};
