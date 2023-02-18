import type { FastifyCookieOptions } from '@fastify/cookie'
import  fastifyCookie from '@fastify/cookie'
import cookie from '@fastify/cookie'
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
// import fastifyWebSocket from '@fastify/websocket'
import fastifySession from '@fastify/session'
// import fastifySession from 'fastify-session'
const server: FastifyInstance = fastify({ logger: true })
import start from '../utils/start'
import chatGPT from './routes/chatGPT'
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/env/.env' })

// server.register(fastifyCookie);
server.register(cookie, {
    secret: 'my-secret', // for cookies signature
    parseOptions: {}, // options for parsing cookies
} as FastifyCookieOptions)

server.register(fastifySession, {
    secret: 'a secret with minimum length of 32 characters',
});

// server.addHook('preHandler', (request, reply, next) => {
//     console.log(request.session.set('fjidjhoid',{}))
//     console.log(request.session.get('fjidjhoid'))
//     // request.session.user = { name: 'max' }
//     next()
// })

// server.addHook('preHandler', (request, reply, next) => {
//     request.session.destroy(next)
// })

server.register(chatGPT);
// Set a session cookie
// function setSessionCookie(reply: FastifyReply, sessionId: string, duration: number) {
//   const expiration = new Date(Date.now() + duration);
//   reply.setCookie('sessionId', sessionId, { expires: expiration, httpOnly: true });
// }

// // Get the value of a session cookie
// function getSessionCookie(request: FastifyRequest): string | undefined {
//   return request.cookies['sessionId'];
// }

// // Example usage
// app.get('/', (request, reply) => {
//     const sessionId = 'abc123'
//     const durationInMinutes = 60 // 1 hour
//     setSessionCookie(reply, sessionId, durationInMinutes * 60 * 1000) // convert to milliseconds
//     const currentSessionId = getSessionCookie(request)
//     console.log(currentSessionId)
//     reply.send('Session cookie set!')
// })

// Set a session cookie
// function setSessionCookie(reply: FastifyReply, sessionId: string, duration: number) {
//   const expiration = new Date(Date.now() + duration);
//   reply.setCookie('sessionId', sessionId, { expires: expiration, httpOnly: true });
// }

// // Get the value of a session cookie
// function getSessionCookie(request: FastifyRequest): string | undefined {
//   return request.cookies['sessionId'];
// }

// server.get('/', { websocket: true }, (connection, request) => {
//     const sessionId = 'abc123'
//     const durationInMinutes = 60 // 1 hour
//     setSessionCookie(connection, sessionId, durationInMinutes * 60 * 1000) // convert to milliseconds
//     const currentSessionId = getSessionCookie(request)
//     console.log(currentSessionId)

//     // connection.socket.on('message', (message : any) => {
//     //     console.log(`Received message: ${message}`)
//     //     connection.socket.send(`You said: ${message}`)
//     // })
// })

start(server);
