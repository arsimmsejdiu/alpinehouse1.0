import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql/index';

const app = express();
const port = 1992;

const server = new ApolloServer({ resolvers, typeDefs });
server.applyMiddleware({ app, path: "/api"})

app.listen(port);
console.log(`[app]: http://localhost:${port}`);

//folder 3 modulo 3 done
