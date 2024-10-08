import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'
import type { FastifyInstance } from 'fastify'
import { CreateGymController } from './create.js'
import { NearbyGymsController } from './nearby.js'
import { SearchGymsController } from './search.js'

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/gyms/search', SearchGymsController)
	app.get('/gyms/nearby', NearbyGymsController)

	app.post(
		'/gyms',
		{ onRequest: [verifyUserRole('ADMIN')] },
		CreateGymController,
	)
}
