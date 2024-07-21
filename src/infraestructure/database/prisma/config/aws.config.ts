import { registerAs } from '@nestjs/config'

export default registerAs('awsConfig', () => ({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	sessionToken: process.env.AWS_SESSION_TOKEN,
	region: process.env.AWS_REGION,
	endpoint: process.env.AWS_ENDPOINT_URL
}))
