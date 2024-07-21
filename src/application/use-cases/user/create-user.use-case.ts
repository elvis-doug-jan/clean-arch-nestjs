import { UserEntity } from '@/domain/entities/user.entity'

import { type UsersRepositoryProtocol } from '../../protocols/uesrs.repository-protocol'
import { type CreateUser } from '../../types/users-create.types'

export class CreateUsersUseCase {
	constructor(private readonly userRepository: UsersRepositoryProtocol) {
		this.userRepository = userRepository
	}

	async execute(data: CreateUser): Promise<UserEntity> {
		const user = new UserEntity(data)
		return this.userRepository.createUser(user)
	}
}
