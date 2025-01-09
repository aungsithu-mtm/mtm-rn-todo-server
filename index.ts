import express from 'express'
import dotenv from 'dotenv'
import http from 'http'

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

httpServer.listen({ port: PORT }, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
