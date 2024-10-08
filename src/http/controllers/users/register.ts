import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function RegisterController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { name, email, password } = registerBodySchema.parse(req.body)

	try {
		const registerUseCase = makeRegisterUseCase()

		await registerUseCase.execute({ name, email, password })
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			reply.status(409).send({ message: err.message })
		}

		throw err
	}

	reply.status(201).send()
}
