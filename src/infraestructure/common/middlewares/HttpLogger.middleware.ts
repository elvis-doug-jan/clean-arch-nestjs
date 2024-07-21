import { Injectable, Logger } from '@nestjs/common'
import { type FastifyReply, type FastifyRequest } from 'fastify'

@Injectable()
export class AppLoggerMiddleware {
	private logger = new Logger('HTTP')

	use(request: FastifyRequest, reply: FastifyReply, next: () => void): void {
		const { method, originalUrl } = request
		const ip = request.ip
		const userAgent = request.headers['user-agent'] || ''
		this.logger.log(`REQUEST => ${method} ${originalUrl} [Agent: ${userAgent} - IP: ${ip}]`)

		reply.raw.on('finish', (request, reply, payload, done) => {
			console.log(request, reply, payload, done)
			// const { statusCode } = reply.res
			// this.logger.log(`RESPONSE <= ${method} ${originalUrl} [Agent: ${userAgent} - IP: ${ip}] => ${statusCode}`)
		})

		next()
	}
}
