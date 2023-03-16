import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRespository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRespository)

  return useCase
}
