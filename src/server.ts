import http from "http";
import app from "./app";
import sequelize from "./database/connect";
import {port, DIALECT, isDevelopment} from "./config";

const server = http.createServer(app);

sequelize
  .authenticate()
  .then(() => console.log(`Connect to ${DIALECT}!`))
  .catch((error: string) => {
    if (isDevelopment) console.log(error);
    console.log("Unable to connect to the database");
  });

server.listen({port}, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql  `)
);
