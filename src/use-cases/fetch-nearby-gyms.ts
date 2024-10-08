import type { IGymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from '@prisma/client'

interface FetchNearbyGymsUseCaseParams {
	userLatitude: number
	userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
	gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		userLatitude,
		userLongitude,
	}: FetchNearbyGymsUseCaseParams): Promise<FetchNearbyGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		})

		return { gyms }
	}
}
