import {MSECS_IN_A_DAY} from "@/utils/datetime"
import axios from "axios"

export const getTemperatures = async (latitude, longitude, startTimestamp) => {
	let days = Math.floor((Date.now() - startTimestamp) / MSECS_IN_A_DAY)
	let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&past_days=${days}`
	let res = await axios.get(url)
	let time = res.data.hourly.time
	let temperature = res.data.hourly.temperature_2m

	let items = []
	for (let idx = 0; idx < time.length; idx++) {
		items.push({
			timestamp: Date.parse(`${time[idx]}Z`),
			temperature: temperature[idx],
		})
	}

	let now = Date.now()
	return items.filter(item => item.timestamp < now)
}
