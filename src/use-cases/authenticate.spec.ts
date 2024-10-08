import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate.js'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { RegisterUseCase } from './register.js'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase
let registerUseCase: RegisterUseCase

const user = {
	email: 'johndoe@email.com',
	name: 'John Doe',
	password: '123456',
}

describe('Authenticate use case', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		registerUseCase = new RegisterUseCase(inMemoryUsersRepository)
		authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository)
	})

	it('should be able to authenticate', async () => {
		const { user: createdUser } = await registerUseCase.execute({
			email: user.email,
			name: user.name,
			password: user.password,
		})

		const { user: authenticatedUser } = await authenticateUseCase.execute({
			email: user.email,
			password: user.password,
		})

		expect(authenticatedUser.id).toEqual(createdUser.id)
	})

	it('should not be able to authenticate with wrong email', async () => {
		await expect(() =>
			authenticateUseCase.execute({
				email: 'wrong_email@email.com',
				password: user.password,
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		await expect(() =>
			authenticateUseCase.execute({
				email: user.email,
				password: 'wrong_password',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
