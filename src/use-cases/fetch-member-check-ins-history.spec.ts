import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchMemberCheckInsHistoryUseCase } from './fetch-member-check-ins-history.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchMemberCheckInsHistoryUseCase

describe('Fetch check-in history use case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new FetchMemberCheckInsHistoryUseCase(checkInsRepository)
	})

	it('should be able to fetch check-in history', async () => {
		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		await checkInsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		})

		const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 })

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-01' }),
			expect.objectContaining({ gym_id: 'gym-02' }),
		])
	})

	it('should be able to fetch paginated check-in history', async () => {
		for (let i = 1; i < 23; i++) {
			await checkInsRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-01',
			})
		}

		const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 })

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-21' }),
			expect.objectContaining({ gym_id: 'gym-22' }),
		])
	})
})
