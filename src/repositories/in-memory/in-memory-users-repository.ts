import { User, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  async findByID(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === userId)

    if (!user) return null

    return user
  }

  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) return null

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      create_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
