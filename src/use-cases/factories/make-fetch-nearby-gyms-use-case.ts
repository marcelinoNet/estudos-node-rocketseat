import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRespository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRespository)

  return useCase
}
