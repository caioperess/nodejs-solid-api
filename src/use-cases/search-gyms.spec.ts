import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new SearchGymsUseCase(gymsRepository)
	})

	it('it should be able to search gyms', async () => {
		const gymTitle = 'JavaScript Gym'

		await gymsRepository.create({
			title: gymTitle,
			description: 'Some description',
			phone: '11999999999',
			latitude: -27.2092052,
			longitude: -49.6401091,
		})

		const { gyms } = await sut.execute({
			query: gymTitle,
			page: 1,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: gymTitle })])
	})

	it('should be able to fetch paginated gyms search', async () => {
		const gymTitle = 'JavaScript Gym'

		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `${gymTitle}-${i}`,
				description: 'Some description',
				phone: '11999999999',
				latitude: -27.2092052,
				longitude: -49.6401091,
			})
		}

		const { gyms } = await sut.execute({
			query: gymTitle,
			page: 2,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: `${gymTitle}-21` }),
			expect.objectContaining({ title: `${gymTitle}-22` }),
		])
	})
})
