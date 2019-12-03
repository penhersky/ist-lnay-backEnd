import dotenv from "dotenv";
import PATH from "path";
import {Dialect} from "sequelize";

const root: Function = PATH.join.bind(this, __dirname, "../");
dotenv.config({path: root(".env")});

export const isProduction: boolean = process.env.NODE_ENV === "production";
export const isDevelopment: boolean = !isProduction;
export const port: number | undefined = Number(process.env.port);

export const SECRET: string = String(process.env.SECRET);
export const DATABASE: string | undefined = process.env.DATABASE;
export const USER_NAME: string | undefined = process.env.USER_NAME;
export const PASSWORD: string | undefined = process.env.PASSWORD;
export const HOST_DB: string | undefined = process.env.HOST_DB;
export const DIALECT: Dialect | undefined = <Dialect>process.env.DIALECT;
export const STORAGE: string | undefined = process.env.STORAGE;

export const EMAIL: string | undefined = process.env.EMAIL;
export const PASS: string | undefined = process.env.PASS;
