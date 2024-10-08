import { prisma } from '@/lib/prisma.js'
import type { Prisma, User } from '@prisma/client'
import type { IUsersRepository } from '../users-repository.js'

export class PrismaUsersRepository implements IUsersRepository {
	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: { id },
		})

		return user
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		return user
	}

	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		})

		return user
	}
}
