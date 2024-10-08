import { describe } from 'node:test'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { beforeEach, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym.js'

let gymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Create gym use case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		createGymUseCase = new CreateGymUseCase(gymsRepository)
	})

	it('should be able to create gym', async () => {
		const { gym } = await createGymUseCase.execute({
			latitude: 0,
			longitude: 0,
			title: 'Gym',
			description: 'Gym description',
			phone: '123456789',
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})
