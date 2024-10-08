import type { IUsersRepository } from '@/repositories/users-repository.js'
import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

interface RegisterUseCaseParams {
	name: string
	email: string
	password: string
}

interface RegisterUseCaseResponse {
	user: User
}

export class RegisterUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		name,
		email,
		password,
	}: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
		const password_hash = await bcrypt.hash(password, 6)

		const hasUserWithSameEmail = await this.usersRepository.findByEmail(email)

		if (hasUserWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash,
		})

		return { user }
	}
}
