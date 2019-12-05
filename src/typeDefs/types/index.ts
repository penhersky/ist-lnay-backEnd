import {concatenateTypeDefs} from "apollo-server-express";
import result from "./result";
import {typeGroup, groupQuery, groupMutation} from "./group";

export const types = concatenateTypeDefs([result, typeGroup]);
export const typeQuery = concatenateTypeDefs([groupQuery]);
export const typeMutation = concatenateTypeDefs([groupMutation]);
