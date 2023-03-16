import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymsUseCase() {
  const gymsRespository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRespository)

  return useCase
}
