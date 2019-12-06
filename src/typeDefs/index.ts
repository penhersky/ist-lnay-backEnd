import {concatenateTypeDefs} from "apollo-server-express";

import Query from "./Query";
import Mutation from "./Mutation";
import {types, typeQuery, typeMutation} from "./types";

export default concatenateTypeDefs([
  types,
  typeMutation,
  typeQuery,
  Query,
  Mutation
]);
