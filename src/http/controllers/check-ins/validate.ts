import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ValidateCheckInController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const validateCheckInParamsSchema = z.object({
		checkInId: z.string().uuid(),
	})

	const { checkInId } = validateCheckInParamsSchema.parse(req.params)

	const validateCheckInUseCase = makeValidateCheckInUseCase()

	await validateCheckInUseCase.execute({
		checkInId,
	})

	reply.status(204).send()
}
