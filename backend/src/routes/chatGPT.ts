import { FastifyInstance as FastInstance } from "fastify";
import { Configuration, OpenAIApi } from "openai";

function chatGPT(fastify: FastInstance, options: any, done: any) {
    fastify.post('/chatGPT', options, async (request) => {
        const body: any = request.body
        const message = body?.message
        const configuration = new Configuration({apiKey: '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'})
        const openAi = new OpenAIApi(configuration)
        const response = await openAi.createCompletion({
            model: 'text-davinci-003',
            prompt: message || 'Tell Me about puppies in less than 100 words.',
            temperature: 0.3,
            max_tokens: 200,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })
        return { aiResponse: response?.data?.choices[0]?.text }
    })
    done()
}
export default chatGPT;
