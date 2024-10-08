import { makeSearchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function NearbyGymsController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const nearbyGymsSchema = z.object({
		latitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { latitude, longitude } = nearbyGymsSchema.parse(req.query)

	const fetchNearbyGymsUseCase = makeSearchNearbyGymsUseCase()

	const { gyms } = await fetchNearbyGymsUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	})

	reply.status(200).send({ gyms })
}
