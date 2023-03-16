import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should be able to resgister', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'Johndoe1@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should has user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'Johndoe1@email.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should has user password upon registration', async () => {
    const email = 'Johndoe1@email.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
