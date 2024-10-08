import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository.js'
import { ValidateValidateCheckInUseCase } from '../validate-check-in.js'

export function makeValidateCheckInUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository()

	return new ValidateValidateCheckInUseCase(checkInsRepository)
}
