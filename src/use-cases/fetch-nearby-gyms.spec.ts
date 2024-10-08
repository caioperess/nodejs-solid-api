import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new FetchNearbyGymsUseCase(gymsRepository)
	})

	it('it should be able to fetch nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: 'Some description',
			phone: '11999999999',
			latitude: -22.20773,
			longitude: -49.92444,
		})

		await gymsRepository.create({
			title: 'Far Gym',
			description: 'Some description',
			phone: '11999999999',
			latitude: -21.72388,
			longitude: -49.35067,
		})

		const { gyms } = await sut.execute({
			userLatitude: -22.20636,
			userLongitude: -49.93302,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
	})
})
