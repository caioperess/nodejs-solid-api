import type { FastifyInstance } from 'fastify'
import { checkInsRoutes } from './controllers/check-ins/routes.js'
import { gymsRoutes } from './controllers/gyms/routes.js'
import { usersRoutes } from './controllers/users/routes.js'

export async function appRoutes(app: FastifyInstance) {
	app.register(gymsRoutes)
	app.register(usersRoutes)
	app.register(checkInsRoutes)
}
