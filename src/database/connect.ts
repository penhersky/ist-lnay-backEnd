import {
  DATABASE,
  USER_NAME,
  PASSWORD,
  HOST_DB,
  DIALECT,
  STORAGE
} from "../config";
import {Sequelize} from "sequelize";

const sequelize: Sequelize = new Sequelize(
  String(DATABASE),
  String(USER_NAME),
  String(PASSWORD),
  {
    host: HOST_DB,
    dialect: DIALECT,
    storage: STORAGE,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;
