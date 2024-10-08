import { app } from '@/app.js'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to fetch nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Near Gym',
				description: 'Some description',
				phone: '11999999999',
				latitude: -22.20773,
				longitude: -49.92444,
			})

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Far Gym',
				description: 'Some description',
				phone: '11999999999',
				latitude: -21.72388,
				longitude: -49.35067,
			})

		const nearbyGymsResponse = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -22.20773,
				longitude: -49.92444,
			})
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(nearbyGymsResponse.statusCode).toEqual(200)
		expect(nearbyGymsResponse.body.gyms).toHaveLength(1)
		expect(nearbyGymsResponse.body.gyms).toEqual([
			expect.objectContaining({
				title: 'Near Gym',
			}),
		])
	})
})
