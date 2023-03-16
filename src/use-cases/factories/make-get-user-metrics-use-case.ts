import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRespository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRespository)

  return useCase
}
