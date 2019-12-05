import {concatenateTypeDefs} from "apollo-server-express";

import Query from "./Query";
import Mutation from "./Mutation";
import {types} from "./types";

export default concatenateTypeDefs([types, Query, Mutation]);
