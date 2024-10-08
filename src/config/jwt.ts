import { env } from '@/env/index.js'

export const jwtConfig = {
	secret: env.JWT_SECRET,
	expiration_time: '10m',
	refresh_expiration_time: '7d',
}
