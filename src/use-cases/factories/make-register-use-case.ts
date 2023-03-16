import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRespository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRespository)

  return registerUseCase
}
