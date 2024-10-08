import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateUseCase } from '../authenticate.js'

export function makeAuthenticateUseCase() {
	const usersRepository = new PrismaUsersRepository()
	return new AuthenticateUseCase(usersRepository)
}
