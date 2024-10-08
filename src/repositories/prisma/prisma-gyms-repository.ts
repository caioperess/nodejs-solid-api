import { paginationConfig } from '@/config/pagination.js'
import { prisma } from '@/lib/prisma.js'
import type { Gym, Prisma } from '@prisma/client'
import type {
	IFindManyNearbyParams,
	IGymsRepository,
} from '../gyms-repository.js'

export class PrismaGymsRepository implements IGymsRepository {
	async searchMany(query: string, page: number): Promise<Gym[]> {
		const gyms = await prisma.gym.findMany({
			where: { title: { contains: query } },
			take: paginationConfig.MAX_ITEMS_PER_PAGE,
			skip: (page - 1) * paginationConfig.MAX_ITEMS_PER_PAGE,
		})

		return gyms
	}

	async findById(id: string): Promise<Gym | null> {
		const gym = await prisma.gym.findUnique({
			where: { id },
		})

		return gym
	}

	async findManyNearby({
		latitude,
		longitude,
	}: IFindManyNearbyParams): Promise<Gym[]> {
		const gyms = await prisma.$queryRaw<Gym[]>`
     SELECT * from gyms
     WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

		return gyms
	}

	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym = await prisma.gym.create({ data })

		return gym
	}
}
