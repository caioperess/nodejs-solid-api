import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository.js'
import { FetchMemberCheckInsHistoryUseCase } from '../fetch-member-check-ins-history.js'

export function makeFetchMemberCheckInUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository()

	return new FetchMemberCheckInsHistoryUseCase(checkInsRepository)
}
