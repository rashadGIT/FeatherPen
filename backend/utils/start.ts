import { FastifyInstance } from 'fastify';

const start = async (fastify: FastifyInstance) => {
  try {
    await fastify.listen(3000, '192.168.178.135')
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
export default start;
