import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import { ApolloServer } from 'apollo-server-express'
import isAuth from './middlewares/isAuth'
import dbConnection from './dbconfig/dbConnection'
import bodyParser from 'body-parser'

dotenv.config();
const PORT = process.env.PORT || 3000;

dbConnection; // Connect with DB

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(isAuth);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

const httpServer = http.createServer(app);
const startApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res })
    });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
}
startApolloServer();

httpServer.listen({ port: PORT }, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
