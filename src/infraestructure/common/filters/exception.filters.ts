import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { type FastifyReply } from 'fastify'
import { ZodError } from 'zod'

export const getStatusCode = (exception: Error): number => {
	return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
}

export const getErrorMessage = (exception: any): string => {
	if (exception?.response) {
		return JSON.stringify(exception?.response?.message)
	}
	return String(exception)
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name)

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const reply = ctx.getResponse<FastifyReply>()

		if (reply && typeof reply.status !== 'function' && typeof reply.send !== 'function') {
			this.logger.error('Não foi possível enviar a resposta HTTP.', exception.stack)
			throw exception
		}

		if (exception instanceof ZodError) {
			return reply.status(HttpStatus.BAD_REQUEST).send({
				error: {
					timestamp: new Date().toISOString(),
					code: HttpStatus.BAD_REQUEST,
					message: exception.flatten().fieldErrors,
					stack: exception.stack,
				},
			})
		}

		const code = getStatusCode(exception)
		const message = getErrorMessage(exception)
		const status = Number(code)
		const stack = exception.stack

		return reply.status(status).send({
			error: {
				timestamp: new Date().toISOString(),
				code,
				message,
				stack,
			},
		})
	}
}
