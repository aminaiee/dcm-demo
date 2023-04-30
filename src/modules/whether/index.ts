import axios from "axios"
import { ONE_DAY_IN_MSEC } from "../../../backend/src/utils/datetime"

//https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&hourly=temperature_2m&past_days=14

export const getTemperatures = async (latitude: number, longitude: number, startTimestamp: number) => {
	let days = Math.floor((Date.now() - startTimestamp) / ONE_DAY_IN_MSEC)
	let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&past_days=${days}`
	let res = await axios.get(url)
	let time = res.data.hourly.time
	let temperature = res.data.hourly.temperature_2m

	let items: any[] = []
	for (let idx = 0; idx < time.length; idx++) {
		items.push({
			timestamp: Date.parse(`${time[idx]}Z`),
			temperature: temperature[idx],
		})
	}

	let now = Date.now()
	return items.filter(item => item.timestamp < now)
}
