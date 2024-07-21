import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppLoggerMiddleware } from './infraestructure/common/middlewares/HttpLogger.middleware'
import { validate } from './infraestructure/database/prisma/config/validateEnvSchema'
import { UsersModule } from './infraestructure/modules/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate,
			validationOptions: {
				allowUnknown: true,
				abortEarly: true,
			},
		}),
		UsersModule,
	],
	controllers: [AppController],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AppLoggerMiddleware).forRoutes('*')
	}
}
