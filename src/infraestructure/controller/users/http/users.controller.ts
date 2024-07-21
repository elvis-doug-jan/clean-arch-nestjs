import { Body, Controller, Get, Post } from '@nestjs/common'

import { UserUseCaseFactory } from '@/application/use-cases/user/user.factory'
import { type UserEntity } from '@/domain/entities/user.entity'

import { CreateUserDto } from './dto/users-create.dto'

@Controller('users')
export class UsersController {
	constructor(private readonly usersUseCase: UserUseCaseFactory) {}

	@Post()
	async create(@Body() userData: CreateUserDto): Promise<UserEntity> {
		return this.usersUseCase.createUser(userData)
	}

	@Get()
	list() {
		return { message: 'FUNCIONOU' }
	}
}
