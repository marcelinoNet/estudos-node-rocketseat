import { CheckinsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCounts: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckinsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCounts = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCounts,
    }
  }
}
