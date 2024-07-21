import { type UserEntity } from '@/domain/entities/user.entity'

import { type UsersRepositoryProtocol } from '../../protocols/uesrs.repository-protocol'
import { type CreateUser } from '../../types/users-create.types'
import { CreateUsersUseCase } from './create-user.use-case'

export class UserUseCaseFactory {
	private readonly createUsersUseCase: CreateUsersUseCase

	constructor(private readonly usersRepository: UsersRepositoryProtocol) {
		this.createUsersUseCase = new CreateUsersUseCase(this.usersRepository)
	}

	async createUser(userData: CreateUser): Promise<UserEntity> {
		return this.createUsersUseCase.execute(userData)
	}
}
