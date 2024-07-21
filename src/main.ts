import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
// import { GlobalExceptionFilter } from './infraestructure/common/filters/exception.filters'
import { configEnv } from './infraestructure/database/prisma/config/env.config'
import { prismaMigrationApply } from './infraestructure/database/prisma/prisma-migration-apply.utils'

async function bootstrap() {
	const { version, prefix, port, environment } = await configEnv()

	await prismaMigrationApply(environment)

	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

	app.enableCors()
	app.setGlobalPrefix(prefix)
	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
	// TODO verificar o GlobalExceptionFilter, pois ao ter uma exceção interta, não é possível usar o "reply" do Fastify
	// app.useGlobalFilters(new GlobalExceptionFilter())

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Logs API')
		.setDescription('API de auditoria de requisições HTTP')
		.setVersion(version)
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup(`${prefix}/api-docs`, app, document)

	await app.listen(port, '0.0.0.0')
}
bootstrap()
