import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function SearchGymsController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const searchGymsQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1),
	})

	const { q, page } = searchGymsQuerySchema.parse(req.query)

	const searchGymUseCase = makeSearchGymsUseCase()

	const { gyms } = await searchGymUseCase.execute({ query: q, page })

	reply.status(200).send({ gyms })
}
