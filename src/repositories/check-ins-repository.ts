import type { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
	findByUserIdOnDate({
		userId,
		date,
	}: { userId: string; date: Date }): Promise<CheckIn | null>
	findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
	findById(id: string): Promise<CheckIn | null>
	countByUserId(userId: string): Promise<number>
	create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
	save(checkIn: CheckIn): Promise<CheckIn>
}
