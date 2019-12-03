import {concatenateTypeDefs} from "apollo-server-express";

import Query from "./Query";
import Mutation from "./Mutation";
import result from "./types/result";

export default concatenateTypeDefs([result, Query, Mutation]);
