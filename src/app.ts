import express from "express";
import bodyParser from "body-parser";
import {ApolloServer} from "apollo-server-express";
import cors from "cors";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();

app.use("*", cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => ({req, res})
});

server.applyMiddleware({app, path: "/graphql"});

export default app;
