import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { GetUserProfileUseCase } from './get-user-profile.js'
import { RegisterUseCase } from './register.js'

let inMemoryUsersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase
let registerUseCase: RegisterUseCase

const user = {
	email: 'johndoe@email.com',
	name: 'John Doe',
	password: '123456',
}

describe('Get user profile use case', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		registerUseCase = new RegisterUseCase(inMemoryUsersRepository)
		getUserProfileUseCase = new GetUserProfileUseCase(inMemoryUsersRepository)
	})

	it('should be able to get user profile', async () => {
		const { user: createdUser } = await registerUseCase.execute({
			email: user.email,
			name: user.name,
			password: user.password,
		})

		const { user: userProfile } = await getUserProfileUseCase.execute({
			userId: createdUser.id,
		})

		expect(userProfile.id).toEqual(createdUser.id)
		expect(userProfile.email).toEqual(createdUser.email)
	})

	it('should not be able to get a non existing user profile', async () => {
		await expect(() =>
			getUserProfileUseCase.execute({ userId: 'non-existing-user-id' }),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
