import { Injectable } from '@nestjs/common'

import { type UsersRepositoryProtocol } from '@/application/protocols/uesrs.repository-protocol'
import { type CreateUser } from '@/application/types/users-create.types'
import { UserEntity } from '@/domain/entities/user.entity'
import { PrismaService } from '@/infraestructure/database/prisma/prisma.service'

@Injectable()
export class UsersRepository implements UsersRepositoryProtocol {
	constructor(private readonly prismaService: PrismaService) {}

	async createUser(data: CreateUser): Promise<UserEntity> {
		const result = await this.prismaService.users.create({ data })
		return new UserEntity(result)
	}

	async updateUser(data: any): Promise<any> {
		return data
	}

	async deleteUser(data: any): Promise<string> {
		return data
	}

	async listUsers(): Promise<any[]> {
		return []
	}

	async getUserById(data: any): Promise<any> {
		return data
	}
}
