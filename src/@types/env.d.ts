declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number
			NODE_ENV: 'local' | 'development' | 'staging' | 'production'
			VERSION: string
			SWAGGER_JSON_FILE_NAME: string
			API_PREFIX: string
			SQL_PRISMA_CONNECTION: string
		}
	}
}
export {}
