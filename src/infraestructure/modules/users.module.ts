import { Module } from '@nestjs/common'

import { UserUseCaseFactory } from '@/application/use-cases/user/user.factory'

import { UsersController } from '../controller/users/http/users.controller'
import { PrismaModule } from '../database/prisma/prisma.module'
import { UsersRepository } from '../repository/users.repository'

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [
		UsersRepository,
		{
			provide: UserUseCaseFactory,
			useFactory: (usersRepository: UsersRepository) => new UserUseCaseFactory(usersRepository),
			inject: [UsersRepository],
		},
	],
})
export class UsersModule {}
