import {getAccessToken} from "./auth"
import axios from "axios"

export const getCalibrationIds = async (projectId) => {
	let token = await getAccessToken('ext-api-calibration')
	let url = `${process.env.DCM_API_BASE_URL}/calibrations`
	let headers = {
		'content-type': 'application/json',
		'authorizationToken': `Bearer ${token}`,
	}
	let query = `query { 
		calibrations(projectId: "${projectId}") {
			calibrationId
		}
	}`
	let body = {query}

	let res = await axios.post(url, body, {headers})
	if (res.data.errors?.message)
		throw new Error(`Error getting calibration list:  ${res.data.errors.message}`)
	return res.data.data.calibrations.map(item => item.calibrationId)
}

export const getFlows = async (calibrationId, startTimestamp, endTimestamp, fields = 'timestamp speed') => {
	let token = await getAccessToken('ext-api-flow')
	let url = `${process.env.DCM_API_BASE_URL}/flows`
	let headers = {
		'content-type': 'application/json',
		'authorizationToken': `Bearer ${token}`,
	}
	let startDate = new Date(startTimestamp).toUTCString()
	let endDate = new Date(endTimestamp).toUTCString()
	let query = `query { 
		flows(calibrationId: "${calibrationId}", startTime: "${startDate}", endTime: "${endDate}") { 
			${fields}
		}
	}`
	let body = {query}

	let res = await axios.post(url, body, {headers})
	if (res.data.errors?.message)
		throw new Error(`Error gettting flows: ', ${res.data.errors.message}`)
	return res.data.data.flows
}

export const getMoods = async (calibrationId, startTimestamp, endTimestamp, fields = 'timestamp mood') => {
	let token = await getAccessToken('ext-api-mood')
	let url = `${process.env.DCM_API_BASE_URL}/moods`
	let headers = {
		'content-type': 'application/json',
		'authorizationToken': `Bearer ${token}`,
	}
	let startDate = new Date(startTimestamp).toUTCString()
	let endDate = new Date(endTimestamp).toUTCString()
	let query = `query { 
		moods(calibrationId: "${calibrationId}", startTime: "${startDate}", endTime: "${endDate}") { 
			${fields}
		}
	}`
	let body = {query}

	let res = await axios.post(url, body, {headers})
	if (res.data.errors?.message)
		throw new Error(`Error gettting moods: ', ${res.data.errors.message}`)
	return res.data.data.moods
}

export const getDensities = async (calibrationId, startTimestamp, endTimestamp, fields = 'timestamp density headcount') => {
	let token = await getAccessToken('ext-api-density')
	let url = `${process.env.DCM_API_BASE_URL}/densities`
	let headers = {
		'content-type': 'application/json',
		'authorizationToken': `Bearer ${token}`,
	}
	let startDate = new Date(startTimestamp).toUTCString()
	let endDate = new Date(endTimestamp).toUTCString()
	let query = `query { 
		densities(calibrationId: "${calibrationId}", startTime: "${startDate}", endTime: "${endDate}") { 
			${fields}
		}
	}`
	let body = {query}

	let res = await axios.post(url, body, {headers})
	if (res.data.errors?.message)
		throw new Error(`Error gettting densities: ', ${res.data.errors.message}`)
	return res.data.data.densities
}
