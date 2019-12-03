import http from "http";
import app from "./app";
import sequelize from "./database/connect";
import {port, DIALECT, isDevelopment, isProduction} from "./config";
import createSchema from "./database/createSchema";

const server = http.createServer(app);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connect to ${DIALECT}!`);
    if (isProduction) createSchema();
  })
  .catch((error: string) => {
    if (isDevelopment) console.log(error);
    console.log("Unable to connect to the database");
  });

server.listen({port}, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql  `)
);
