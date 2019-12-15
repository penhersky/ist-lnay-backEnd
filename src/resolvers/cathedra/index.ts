import types from "./types";
import queryCathedra from "./Query";

export const cathedraTypes = {
  ...types,
  queryCathedra
};

export const cathedraQuery = {
  Cathedra: queryCathedra.getCathedra
};

export const cathedraMutation = {};
