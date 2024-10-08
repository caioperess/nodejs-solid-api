import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(req: FastifyRequest, reply: FastifyReply) {
	try {
		await req.jwtVerify()
	} catch (_) {
		return reply.status(401).send({ message: 'Unauthorized' })
	}
}
