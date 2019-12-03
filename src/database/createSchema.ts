import {User} from "./models/index";

const createSchemas = async () => {
  await User.sync({force: true});
};

export default createSchemas;
