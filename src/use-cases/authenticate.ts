import type { IUsersRepository } from '@/repositories/users-repository.js'
import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

interface AuthenticateUseCaseParams {
	email: string
	password: string
}

interface AuthenticateUseCaseResponse {
	user: User
}

export class AuthenticateUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseParams): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await bcrypt.compare(
			password,
			user.password_hash,
		)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return { user }
	}
}
