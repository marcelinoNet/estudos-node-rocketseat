import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

describe('Fetch neaby gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearbyGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -7.0743724,
      longitude: -41.471574,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -6.9632607,
      longitude: -41.3352668,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.0743724,
      userLongitude: -41.471574,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })

  /*  it('Should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia javascript ${i}`,
        description: null,
        phone: null,
        latitude: -7.0741469,
        longitude: -41.4723104,
      })
    }

    const { gyms } = await sut.execute({
      query: 'javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia javascript 21' }),
      expect.objectContaining({ title: 'Academia javascript 22' }),
    ])
  }) */
})
