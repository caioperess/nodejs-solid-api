import { app } from '@/app.js'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to search gyms', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'JavaScript Gym',
				description: 'Some description.',
				phone: '11999999999',
				latitude: -27.2092052,
				longitude: -49.6401091,
			})

		const gymsResponse = await request(app.server)
			.get('/gyms/search')
			.query({
				q: 'JavaScript',
			})
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(gymsResponse.statusCode).toEqual(200)
		expect(gymsResponse.body.gyms).toHaveLength(1)
		expect(gymsResponse.body.gyms).toEqual([
			expect.objectContaining({
				title: 'JavaScript Gym',
			}),
		])
	})
})
