import { getTemperatures } from '../../../src/modules/whether';
import config from '../config/server';
import { Temperatures } from '../../../src/modules/models/base';
import { ONE_DAY_IN_MSEC } from '../utils/datetime';

export class TemperaturesUpdater {
	model: Temperatures
	#latitude: number
	#longitude: number
	#startTimestamp: number

	constructor(location: string, latitude: number, longitude: number) {
		this.model = new Temperatures(location)
		this.#latitude = latitude
		this.#longitude = longitude
		this.#startTimestamp = Date.now() - config.redis.dataRetentionDays * ONE_DAY_IN_MSEC
	}

	start() {
		setTimeout(() => this.#update(), this.#getUpdateInterval() * 1000)
	}

	#getUpdateInterval() {
		let interval = 120
		return Math.floor(Math.random() * interval) + interval
	}

	async #update() {
		let now = Date.now()
		const lastTimestamp = await this.model.getLastTimestamp()
		this.#startTimestamp = Math.max(this.#startTimestamp, lastTimestamp)
		this.#startTimestamp = Math.min(this.#startTimestamp, now)

		try {
			let data = await getTemperatures(this.#latitude, this.#longitude, this.#startTimestamp)
			console.log(data.length)
			for (const { timestamp, temperature } of data) {
				await this.model.putData(timestamp, temperature)
				this.#startTimestamp = timestamp
			}
		} catch (err) {
			console.log(err)
		}

		setTimeout(() => this.#update(), this.#getUpdateInterval() * 1000)
	}
}