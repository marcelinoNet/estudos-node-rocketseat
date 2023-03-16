import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'Johndoe1@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'Johndoe1@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'Johndoe1@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'Johndoe1@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'Johndoe1@email.com',
        password: '1233333',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
