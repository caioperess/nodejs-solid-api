import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { jwtConfig } from './config/jwt.js'
import { env } from './env/index.js'
import { appRoutes } from './http/routes.js'

const app = fastify()

app.register(fastifyJwt, {
	secret: jwtConfig.secret,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: { expiresIn: jwtConfig.expiration_time },
})

app.register(fastifyCookie)

app.register(appRoutes)

app.setErrorHandler((err, _, reply) => {
	if (err instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: err.format(),
		})
	}

	if (env.NODE_ENV !== 'production') {
		console.error(err)
	}

	return reply.status(500).send({
		message: 'Internal server error.',
	})
})

export { app }
