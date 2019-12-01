import {concatenateTypeDefs} from "apollo-server-express";

import register from "./auth/registerInput";

export default concatenateTypeDefs([register]);
