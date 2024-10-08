import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'
import { RegisterUseCase } from './register.js'

let inMemoryUsersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register use case', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		registerUseCase = new RegisterUseCase(inMemoryUsersRepository)
	})

	it('should be able to register', async () => {
		const { user } = await registerUseCase.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to register with same email', async () => {
		const email = 'johndoe@example.com'

		await registerUseCase.execute({
			name: 'John Doe',
			email,
			password: '123456',
		})

		await expect(() =>
			registerUseCase.execute({
				name: 'John Doe',
				email,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})

	it('should hash user password upon registration', async () => {
		const { user } = await registerUseCase.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		const isPasswordHashed = await compare('123456', user.password_hash)

		expect(isPasswordHashed).toBe(true)
	})
})
