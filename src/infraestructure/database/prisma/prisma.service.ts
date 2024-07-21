import { Injectable, type OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'prisma/clean-arch'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			log: ['error', 'info', 'query', 'warn'],
		})
	}

	async onModuleInit() {
		await this.$connect()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
