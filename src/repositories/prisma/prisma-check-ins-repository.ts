import { paginationConfig } from '@/config/pagination.js'
import { prisma } from '@/lib/prisma.js'
import type { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import type { ICheckInsRepository } from '../check-ins-repository.js'

export class PrismaCheckInsRepository implements ICheckInsRepository {
	async findByUserIdOnDate({ userId, date }: { userId: string; date: Date }) {
		const startOfTheDay = dayjs(date).startOf('date')
		const endOfTheDay = dayjs(date).endOf('date')

		const checkInOnDate = await prisma.checkIn.findFirst({
			where: {
				user_id: userId,
				created_at: { gte: startOfTheDay.toDate(), lte: endOfTheDay.toDate() },
			},
		})

		return checkInOnDate
	}

	async findManyByUserId(userId: string, page: number) {
		const checkIns = await prisma.checkIn.findMany({
			where: { user_id: userId },
			skip: paginationConfig.MAX_ITEMS_PER_PAGE * (page - 1),
			take: paginationConfig.MAX_ITEMS_PER_PAGE,
		})

		return checkIns
	}

	async findById(id: string) {
		const checkIn = await prisma.checkIn.findUnique({ where: { id } })

		return checkIn
	}

	async countByUserId(userId: string) {
		const count = await prisma.checkIn.count({ where: { user_id: userId } })

		return count
	}

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = await prisma.checkIn.create({
			data,
		})

		return checkIn
	}

	async save(checkIn: CheckIn) {
		const updatedCheckIn = await prisma.checkIn.update({
			where: { id: checkIn.id },
			data: checkIn,
		})

		return updatedCheckIn
	}
}
