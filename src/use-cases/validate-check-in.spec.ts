import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { ValidateValidateCheckInUseCase } from './validate-check-in.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateValidateCheckInUseCase

describe('Check-in use case', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new ValidateValidateCheckInUseCase(checkInsRepository)
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to validate a check-in', async () => {
		const checkIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		const { checkIn: validatedCheckIn } = await sut.execute({
			checkInId: checkIn.id,
		})

		expect(validatedCheckIn.created_at).toEqual(expect.any(Date))
		expect(checkInsRepository.checkIns[0].validated_at).toEqual(
			expect.any(Date),
		)
	})

	it('should not be able to validate an inexistent check-in', async () => {
		await expect(
			sut.execute({
				checkInId: 'inexistent-check-in-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

	it('should not be able to validate a check-in after 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2024, 0, 1, 13, 40))

		const checkIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		const _21minutesInMs = 1000 * 60 * 21

		vi.advanceTimersByTime(_21minutesInMs)

		await expect(
			sut.execute({
				checkInId: checkIn.id,
			}),
		).rejects.toBeInstanceOf(LateCheckInValidationError)
	})
})
