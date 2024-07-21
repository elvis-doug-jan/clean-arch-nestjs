import { type UserEntity } from '@/domain/entities/user.entity'

import { type CreateUser } from '../types/users-create.types'

export abstract class UsersRepositoryProtocol {
	abstract createUser(data: CreateUser): Promise<UserEntity>
	abstract updateUser(data: any): Promise<UserEntity>
	abstract deleteUser(data: any): Promise<string>
	abstract listUsers(): Promise<UserEntity[]>
	abstract getUserById(data: any): Promise<UserEntity>
}
