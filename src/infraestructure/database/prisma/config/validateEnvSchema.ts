import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumberString, IsOptional, IsString, validateSync } from 'class-validator'

class EnvironmentVariables {
	@IsEnum(['local', 'development', 'staging', 'production'])
	@IsOptional()
	NODE_ENV: string

	@IsString()
	@IsOptional()
	SQL_ECO_LOGS_CONNECTION: string

	@IsString()
	@IsOptional()
	SWAGGER_JSON_FILE_NAME: string

	@IsString()
	@IsOptional()
	API_PREFIX: string

	@IsString()
	@IsOptional()
	VERSION: string

	@IsNumberString({ no_symbols: true })
	@IsOptional()
	PORT: string
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true })
	const errors = validateSync(validatedConfig, { skipMissingProperties: false })

	if (errors.length > 0) {
		throw new Error(errors.toString())
	}
	return validatedConfig
}
