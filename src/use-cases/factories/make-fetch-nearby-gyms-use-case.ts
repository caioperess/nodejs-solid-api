import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms.js'

export function makeSearchNearbyGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository()
	return new FetchNearbyGymsUseCase(gymsRepository)
}
