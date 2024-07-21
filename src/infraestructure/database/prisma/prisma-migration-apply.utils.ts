import { execSync } from 'node:child_process'

export async function prismaMigrationApply(nodeEnv: string) {
	if (nodeEnv !== 'local') {
		try {
			this.logger.log(
				`Running migration prisma migrations on deploy mode to database: "${process.env.SQL_ECO_LOGS_CONNECTION}"`
			)
			const command = 'prisma migrate deploy'
			await this.executeCommand(command)
			return new Promise((resolve, reject) => {
				try {
					const result = execSync(command, { encoding: 'utf-8' })
					this.logger.log(`MIGRATION RESULT: ${result}`)
					resolve(result)
				} catch (error) {
					this.logger.error(`execSync error: ${error}`)
					reject(error)
				}
			})
		} catch (error) {
			console.error('Error running prisma migrate deploy', error)
			throw error
		}
	}
}
