import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function CheckInMetricsController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchCheckInHistoryUseCase = makeGetUserMetricsUseCase()

	const { checkInsCount } = await fetchCheckInHistoryUseCase.execute({
		userId: req.user.sub,
	})

	reply.status(200).send({ checkInsCount })
}
