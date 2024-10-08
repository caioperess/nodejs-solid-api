import type { IGymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from '@prisma/client'

interface CreateGymUseCaseParams {
	title: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

interface CreateGymUseCaseResponse {
	gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	}: CreateGymUseCaseParams): Promise<CreateGymUseCaseResponse> {
		const gym = await this.gymsRepository.create({
			title,
			description,
			phone,
			latitude,
			longitude,
		})

		return { gym }
	}
}
