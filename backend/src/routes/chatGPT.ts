import { v4 as uuidv4 } from 'uuid';
import { FastifyRequest, FastifyReply, FastifyInstance as FastInstance } from 'fastify';
import { Configuration, OpenAIApi } from 'openai';
import { RequestBody } from '../interfaces/RequestBody';
import * as dotenv from 'dotenv';
dotenv.config({ path:'../env/.env' });

const  setSessionCookie = (reply: FastifyReply, sessionId: string, value: any, duration: number) => {
  const expiration = new Date(Date.now() + duration);
  reply.cookie(sessionId, JSON.stringify(value), { expires: expiration, httpOnly: true });
}

const getSessionCookie = (request: FastifyRequest): string | undefined =>
    request.cookies[String(process.env.COOKIE_NAME)]

const removeSessionCookie = (reply: FastifyReply) =>
    reply.clearCookie(String(process.env.COOKIE_NAME))

const id = uuidv4();

function chatGPT(fastify: FastInstance, options: any, done: any) {
    
    fastify.post<{ Params: { userId: string }; Body: { message: string } }>(
        '/chatGPT/clear',
        async (request: FastifyRequest, reply : FastifyReply) => {
            removeSessionCookie(reply);
        });

    fastify.post('/chatGPT', async (request: FastifyRequest, reply: FastifyReply) => {
        const startTime = new Date(Date.now());
        const arr: any[] = [];    
        const currentCookie = getSessionCookie(request);
        const durationInMinutes = 60;
        const cookieExpirationTime = durationInMinutes * 60 * 1000
        const { message = 'Tell Me about puppies in less than 100 words.' } = request.body as RequestBody
        const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
        const openAi = new OpenAIApi(configuration)
         try {
             if (currentCookie) {
                 arr.push(...JSON.parse(currentCookie),
                     {
                         userId: id,
                         time: startTime,
                         message: message,
                     },
                 )
             } else {
                 arr.push({
                     userId: id,
                     time: startTime,
                     message: message,
                 })
             }
             
             const prompt = arr.map(x => {
                const m = x?.message;
                const r = x?.aiResponse;
                if(m && r) return `${m}\n${r}\n`;
                if(!r) return `${m}\n`
                return null;
            });
             
             const response = await openAi.createCompletion({
                 model: String(process.env.AI_MODEL),
                 prompt: prompt.join('\n'),
                 temperature: 0.3,
                 max_tokens: 200,
                 top_p: 1.0,
                 frequency_penalty: 0.0,
                 presence_penalty: 0.0,
             })
             const { choices = []} = response?.data
             const aiResponse = choices[0]?.text
             const finishReason = choices[0]?.finish_reason

             arr[arr.length - 1].aiResponse = aiResponse;

            setSessionCookie(reply,String(process.env.COOKIE_NAME), arr, cookieExpirationTime)

             return { finishReason, aiResponse }
         } catch (error: any) {
             return {
                 status: 401,
                 error: error.message,
                 aiResponse: '',
             }
         }
        }
    )
    done()
}
export default chatGPT
