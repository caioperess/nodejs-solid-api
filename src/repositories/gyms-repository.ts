import type { Gym, Prisma } from '@prisma/client'

export interface IFindManyNearbyParams {
	latitude: number
	longitude: number
}

export interface IGymsRepository {
	searchMany(query: string, page: number): Promise<Gym[]>
	findById(id: string): Promise<Gym | null>
	findManyNearby(params: IFindManyNearbyParams): Promise<Gym[]>
	create(data: Prisma.GymCreateInput): Promise<Gym>
}
