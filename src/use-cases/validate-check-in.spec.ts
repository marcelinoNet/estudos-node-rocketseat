import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-chek-ins-repository'
import { beforeEach, describe, expect, it, afterEach, vi } from 'vitest'
import { LateCheckInValidationError } from './erros/late-check-in-validation-error'
import { ResouceNotFoundError } from './erros/resource-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in'

describe('Validade Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let sut: ValidateCheckInUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to validade the check-in', async () => {
    // vi.setSystemTime(new Date(2023, 2, 10, 8))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym_id',
      user_id: 'user_id',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('Should not be able to validade an inexistent check-in', async () => {
    // vi.setSystemTime(new Date(2023, 2, 10, 8)

    await expect(
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })

  it('Should not be able to validade the check-in after 20 minutes of its creations', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym_id',
      user_id: 'user_id',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
