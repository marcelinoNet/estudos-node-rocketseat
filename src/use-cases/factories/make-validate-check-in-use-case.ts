import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInsUseCase() {
  const checkInsRespository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRespository)

  return useCase
}
