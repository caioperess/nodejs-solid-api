import { jwtConfig } from '@/config/jwt.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function RefreshTokenController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	await req.jwtVerify({ onlyCookie: true })

	const role = req.user.role

	const token = await reply.jwtSign({ role }, { sign: { sub: req.user.sub } })

	const refreshToken = await reply.jwtSign(
		{ role },
		{
			sign: { sub: req.user.sub, expiresIn: jwtConfig.refresh_expiration_time },
		},
	)

	reply
		.setCookie('refreshToken', refreshToken, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.status(200)
		.send({ token })
}
