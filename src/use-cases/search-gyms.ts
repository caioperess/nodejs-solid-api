import type { IGymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from '@prisma/client'

interface SearchGymsUseCaseParams {
	query: string
	page: number
}

interface SearchGymsUseCaseResponse {
	gyms: Gym[]
}

export class SearchGymsUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		query,
		page,
	}: SearchGymsUseCaseParams): Promise<SearchGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page)

		return { gyms }
	}
}
