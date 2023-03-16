import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

describe('Search gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia javascript',
      description: null,
      phone: null,
      latitude: -7.0741469,
      longitude: -41.4723104,
    })

    await gymsRepository.create({
      title: 'Academia Typescript',
      description: null,
      phone: null,
      latitude: -7.0741469,
      longitude: -41.4723104,
    })

    const { gyms } = await sut.execute({
      query: 'javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
  })

  it('Should be able to fetch paginated gyms search', async () => {
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
  })
})
