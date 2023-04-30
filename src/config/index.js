const config = {
	dataRetentionDays: 20,
	dcm: {
		auth: {
			clientId: process.env.DCM_AUTH_CLIENT_ID,
			clientSecret: process.env.DCM_AUTH_CLIENT_SECRET,
			domain: process.env.DCM_AUTH_DOMAIN,
		},
		projectId: process.env.DCM_PROJECT_ID,
		calibrationId: process.env.DCM_CALIBRATION_ID,
		apiBaseUrl: process.env.DCM_API_BASE_URL,
	}
}

export default config