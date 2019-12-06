import express from "express";
import bodyParser from "body-parser";
import {ApolloServer, makeExecutableSchema} from "apollo-server-express";
import cors from "cors";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();

app.use("*", cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {requireResolversForResolveType: false}
});

const server = new ApolloServer({
  schema,
  context: ({req, res}) => ({req, res})
});

server.applyMiddleware({app, path: "/graphql"});

export default app;
