import type { ICheckInsRepository } from '@/repositories/check-ins-repository.js'
import type { CheckIn } from '@prisma/client'

interface Request {
	userId: string
	page: number
}

interface Response {
	checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
	constructor(private checkInsRepository: ICheckInsRepository) {}

	async execute({ userId, page }: Request): Promise<Response> {
		const checkIns = await this.checkInsRepository.findManyByUserId(
			userId,
			page,
		)

		return { checkIns }
	}
}
