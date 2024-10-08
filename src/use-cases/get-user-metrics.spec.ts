import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics use case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new GetUserMetricsUseCase(checkInsRepository)
	})

	it('should be able to get user metrics', async () => {
		for (let i = 0; i < 5; i++) {
			await checkInsRepository.create({
				gym_id: 'gym-01',
				user_id: 'user-01',
			})
		}

		const { checkInsCount } = await sut.execute({ userId: 'user-01' })

		expect(checkInsCount).toEqual(5)
	})
})
