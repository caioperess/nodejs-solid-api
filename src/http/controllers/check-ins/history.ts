import { makeFetchMemberCheckInUseCase } from '@/use-cases/factories/make-fetch-member-check-in-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CheckInHistoryController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const checkInHistoryQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	})

	const { page } = checkInHistoryQuerySchema.parse(req.query)

	const fetchCheckInHistoryUseCase = makeFetchMemberCheckInUseCase()

	const { checkIns } = await fetchCheckInHistoryUseCase.execute({
		userId: req.user.sub,
		page,
	})

	reply.status(200).send({ checkIns })
}
