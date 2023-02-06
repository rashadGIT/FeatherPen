import { FastifyInstance } from "fastify";
// const { Configuration, OpenAIApi } = require('openai')
import { Configuration, OpenAIApi } from "openai";

function chatGPT(fastify: FastifyInstance, options: any, done: any) {
  fastify.get("/chatGPT", options, async function (request, reply) {
    const body: any = request.body
    const message  = body?.message
    const configuration = new Configuration({
        apiKey: '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',
    })
    const openai = new OpenAIApi(configuration)

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message || 'Tell Me a happy story in less than 100 words.',
        temperature: 0.3,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })
    
    return { aiResponse:response.data.choices[0].text }
  });
  done();
}
export default chatGPT;
