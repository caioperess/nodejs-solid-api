import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates.js'
import { type Gym, Prisma } from '@prisma/client'
import type {
	IFindManyNearbyParams,
	IGymsRepository,
} from '../gyms-repository.js'

export class InMemoryGymsRepository implements IGymsRepository {
	public gyms: Gym[] = []

	async findById(id: string): Promise<Gym | null> {
		const gym = this.gyms.find((gym) => gym.id === id)

		return gym ?? null
	}

	async findManyNearby({
		latitude,
		longitude,
	}: IFindManyNearbyParams): Promise<Gym[]> {
		const MAX_DISTANCE_IN_KILOMETERS = 10

		const gyms = this.gyms.filter((gym) => {
			const distance = getDistanceBetweenCoordinates(
				{ latitude, longitude },
				{
					latitude: gym.latitude.toNumber(),
					longitude: gym.longitude.toNumber(),
				},
			)

			return distance < MAX_DISTANCE_IN_KILOMETERS
		})

		return gyms
	}

	async searchMany(query: string, page: number): Promise<Gym[]> {
		const gyms = this.gyms
			.filter((gym) => gym.title.toLowerCase().includes(query.toLowerCase()))
			.slice((page - 1) * 20, page * 20)

		return gyms
	}

	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
			created_at: new Date(),
		}

		this.gyms.push(gym)

		return gym
	}
}
