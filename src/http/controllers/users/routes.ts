import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import type { FastifyInstance } from 'fastify'
import { AuthenticateController } from './authenticate.js'
import { ProfileController } from './profile.js'
import { RefreshTokenController } from './refresh.js'
import { RegisterController } from './register.js'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', RegisterController)
	app.post('/sessions', AuthenticateController)

	app.patch('/token/refresh', RefreshTokenController)

	/** Authenticated Routes */
	app.get('/me', { onRequest: [verifyJwt] }, ProfileController)
}
