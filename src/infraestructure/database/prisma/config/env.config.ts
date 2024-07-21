import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'

const nodeEnvs = ['local', 'development', 'staging', 'production']

type Environment = {
	port: number
	version: string
	environment: typeof process.env.NODE_ENV
	prefix: string
	swaggerJsonFileName: string
	sqlPrismaConnection: string
}

interface ConfigEnvFunction {
	(): Promise<Environment>
}

export const configEnv: ConfigEnvFunction = async () => {
	const NODE_ENV = process.env.NODE_ENV

	if (!nodeEnvs.includes(NODE_ENV)) {
		throw new Error(`Invalid NODE_ENV: ${NODE_ENV}`)
	}
	console.info('Environment: ', NODE_ENV)

	if (NODE_ENV !== 'local') {
		console.log('Loading parameters from SSM')
		const APPLICATION_NAME = process.env.APPLICATION_NAME

		try {
			const ssmClient = new SSMClient({ region: 'us-east-1' })

			const command = new GetParameterCommand({
				Name: `${APPLICATION_NAME}-${NODE_ENV}.json`,
				WithDecryption: true,
			})

			const { Parameter } = await ssmClient.send(command)

			const parsedValue = JSON.parse(Parameter?.Value ?? '')
			if (!parsedValue) {
				throw new Error('Invalid parameters response')
			}
			Object.keys(parsedValue).forEach((paramName) => {
				if (paramName) process.env[paramName] = parsedValue[paramName] ?? ''
			})
			console.log('Parameters loaded from SSM')
		} catch (error) {
			console.error('Error loading parameters from SSM', error)
			throw error
		}
	}

	const _envs: Environment = {
		port: Number(process.env.PORT),
		version: process.env.VERSION,
		environment: NODE_ENV,
		prefix: process.env.API_PREFIX,
		sqlPrismaConnection: process.env.SQL_PRISMA_CONNECTION,
		swaggerJsonFileName: process.env.SWAGGER_JSON_FILE_NAME,
	}

	console.log('ENVs:', _envs)
	return _envs
}
