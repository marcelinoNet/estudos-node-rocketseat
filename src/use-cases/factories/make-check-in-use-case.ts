import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { ChekcinUseCase } from '../check-ins'

export function makeChecInsUseCase() {
  const checkInsRespository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new ChekcinUseCase(checkInsRespository, gymsRepository)

  return useCase
}
