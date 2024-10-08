import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'
import type { FastifyInstance } from 'fastify'
import { CreateCheckInController } from './create.js'
import { CheckInHistoryController } from './history.js'
import { CheckInMetricsController } from './metrics.js'
import { ValidateCheckInController } from './validate.js'

export async function checkInsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/check-ins/history', CheckInHistoryController)
	app.get('/check-ins/metrics', CheckInMetricsController)

	app.patch(
		'/check-ins/:checkInId/validate',
		{ onRequest: [verifyUserRole('ADMIN')] },
		ValidateCheckInController,
	)

	app.post('/gyms/:gymId/check-ins', CreateCheckInController)
}
