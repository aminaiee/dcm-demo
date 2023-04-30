const dotenv = require('dotenv')

dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const config = {
	redis: {
		url: `redis://${process.env.REDIS_URL}`,
		dataRetentionDays: 5,
	},
	dcm: {
		auth: {
			clientId: process.env.DCM_AUTH_CLIENT_ID,
			clientSecret: process.env.DCM_AUTH_CLIENT_SECRET,
			domain: process.env.DCM_AUTH_DOMAIN,
		},
		projectId: process.env.DCM_PROJECT_ID,
		apiBaseUrl: process.env.DCM_API_BASE_URL,
	}
}

export default config