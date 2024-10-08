import type { IUsersRepository } from '@/repositories/users-repository.js'
import type { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface GetUserProfileUseCaseParams {
	userId: string
}

interface GetUserProfileUseCaseResponse {
	user: User
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		userId,
	}: GetUserProfileUseCaseParams): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId)

		if (!user) {
			throw new ResourceNotFoundError()
		}

		return { user }
	}
}
