import { FastifyInstance } from 'fastify';
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '../env/.env' })

const start = async (fastify: FastifyInstance) => {
  const port = Number(process.env.PORT);
  try {
    await fastify.listen({ port: port }, () => {
        console.log(`Server started on port ${port}`)
    })
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
export default start;
