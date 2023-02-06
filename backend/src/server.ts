import fastify, { FastifyInstance } from 'fastify';
const app: FastifyInstance = fastify({ logger: true });
import start from "../utils/start";
import chatGPT from './routes/chatGPT'

app.register(chatGPT)
start(app);
