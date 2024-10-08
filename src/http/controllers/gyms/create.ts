import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateGymController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const createBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { title, description, phone, latitude, longitude } =
		createBodySchema.parse(req.body)

	const createGymUseCase = makeCreateGymUseCase()

	await createGymUseCase.execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	})

	reply.status(201).send()
}
