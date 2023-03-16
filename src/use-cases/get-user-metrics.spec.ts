import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-chek-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

describe('Get User Metrics Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: GetUserMetricsUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('Should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCounts } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCounts).toEqual(2)
  })
})
