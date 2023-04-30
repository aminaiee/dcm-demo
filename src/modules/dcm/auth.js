import axios from "axios";

let cachedAccessTokens = {}

const getAccessTokenFromTokenEndpoint = async (apiIdentifier) => {
	let options = {
		url: `https://${process.env.DCM_AUTH_DOMAIN}/oauth/token`,
		method: 'POST',
		headers: {'content-type': 'application/x-www-form-urlencoded'},
		data: {
			grant_type: 'client_credentials',
			client_id: process.env.DCM_AUTH_CLIENT_ID,
			client_secret: process.env.DCM_AUTH_CLIENT_SECRET,
			audience: apiIdentifier
		}
	};

	try {
		let res = await axios.request(options)
		return res.data
	} catch (err) {
		throw new Error(`Unable to get token for ${apiIdentifier}`)
	}
}

export const getAccessToken = async (apiIdentifier) => {
	let token = cachedAccessTokens[apiIdentifier]
	if (!token) {
		let res = await getAccessTokenFromTokenEndpoint(apiIdentifier)
		token = res['access_token']
		console.log(apiIdentifier, token)
		cachedAccessTokens[apiIdentifier] = token

		//remove the token from cache 60 seconds before expiry
		let expiry = res['expires_in'] - 60
		setTimeout(() => cachedAccessTokens[apiIdentifier] = undefined, expiry * 1000)

	}

	return token
}
