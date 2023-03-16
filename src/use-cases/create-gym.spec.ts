import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

describe('Create Gym Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('Should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia javascript',
      description: null,
      phone: null,
      latitude: -7.0741469,
      longitude: -41.4723104,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
