import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-chek-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { ChekcinUseCase } from './check-ins'
import { MaxDistanceError } from './erros/max-distance-error'
import { MaxNumberOfCheckInsError } from './erros/max-number-of-checkins-error'

describe('Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymRepository: InMemoryGymsRepository
  let sut: ChekcinUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new ChekcinUseCase(checkInsRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-01',
      title: 'Academia javascript',
      description: '',
      phone: '',
      latitude: -7.0741469,
      longitude: -41.4723104,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 2, 10, 8))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.0741469,
      userLongitude: -41.4723104,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 2, 10, 8))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.0741469,
      userLongitude: -41.4723104,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -7.0741469,
        userLongitude: -41.4723104,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('Should be able to check in twice but in the different days', async () => {
    vi.setSystemTime(new Date(2023, 2, 10, 8))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.0741469,
      userLongitude: -41.4723104,
    })

    vi.setSystemTime(new Date(2023, 2, 11, 8))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.0741469,
      userLongitude: -41.4723104,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2023, 2, 10, 8))

    gymRepository.items.push({
      id: 'gym-02',
      title: 'Academia javascript',
      description: '',
      phone: '',
      latitude: new Decimal(-7.0619038),
      longitude: new Decimal(-41.4682066),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -7.0741469,
        userLongitude: -41.4723104,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
