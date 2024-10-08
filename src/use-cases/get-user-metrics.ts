import type { ICheckInsRepository } from '@/repositories/check-ins-repository.js'

interface Request {
	userId: string
}

interface Response {
	checkInsCount: number
}

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: ICheckInsRepository) {}

	async execute({ userId }: Request): Promise<Response> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId)

		return { checkInsCount }
	}
}
