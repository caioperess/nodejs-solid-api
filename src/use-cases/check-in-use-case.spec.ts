import { afterEach } from 'node:test'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in-use-case.js'
import { MaxDistanceError } from './errors/max-distance-error.js'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.js'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('Check-in use case', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
		inMemoryGymsRepository = new InMemoryGymsRepository()
		checkInUseCase = new CheckInUseCase(
			inMemoryCheckInsRepository,
			inMemoryGymsRepository,
		)

		inMemoryGymsRepository.create({
			id: 'gym-01',
			latitude: 0,
			longitude: 0,
			title: 'Gym',
			description: '',
			phone: '',
		})
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn } = await checkInUseCase.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should be able to check in twice in different days', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await checkInUseCase.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0,
		})

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

		const { checkIn } = await checkInUseCase.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await checkInUseCase.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: 0,
			userLongitude: 0,
		})

		await expect(() =>
			checkInUseCase.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: 0,
				userLongitude: 0,
			}),
		).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
	})

	it('should not be able to check in on distant gym', async () => {
		inMemoryGymsRepository.create({
			id: 'gym-02',
			latitude: -22.1411676,
			longitude: -49.5809715,
			title: 'Gym 2',
			description: '',
			phone: '',
		})

		await expect(() =>
			checkInUseCase.execute({
				gymId: 'gym-02',
				userId: 'user-01',
				userLatitude: -22.2074126,
				userLongitude: -49.9245264,
			}),
		).rejects.toBeInstanceOf(MaxDistanceError)
	})
})
