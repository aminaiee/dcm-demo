import {createClient} from 'redis';


let url = '127.0.0.1:6379'

let client = createClient({url})
client.on('error', err => console.log('Redis Client Error', err));

export const createFlow = async (projectId, calibrationId) => {
	let key = `flow:${projectId}:${calibrationId}`
	await client.connect()

	let exists = await client.exists(key)
	console.log(exists)
}