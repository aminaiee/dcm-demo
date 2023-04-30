import config from '../config/server'
import { Densities, Flows } from '../../../src/modules/models/base'
import { ONE_DAY_IN_MSEC } from '../utils/datetime';
import { getDensities, getFlows } from '../api/dcm';




export class DensitiesUpdater {
	model: Densities
	#startTimestamp: number

	constructor(projectId: string, calibrationId: string) {
		this.model = new Densities(projectId, calibrationId)
		this.#startTimestamp = Date.now() - config.redis.dataRetentionDays * ONE_DAY_IN_MSEC
	}

	start() {
		setTimeout(() => this.#update(), this.#getUpdateInterval() * 1000)
	}

	#getUpdateInterval() {
		let interval = 60
		return Math.floor(Math.random() * interval) + interval
	}

	async #update() {
		const lastTimestamp = await this.model.getLastTimestamp()
		console.log("+++++++++++++++++++++++++++++", lastTimestamp, this.#startTimestamp)
		this.#startTimestamp = Math.max(this.#startTimestamp, lastTimestamp)
		let calibrationId = this.model.calibrationId
		let endTimestamp = this.#startTimestamp + ONE_DAY_IN_MSEC

		try {
			let data = await getDensities(calibrationId, this.#startTimestamp, endTimestamp)
			console.log(data)
			for (const { timestamp, density } of data) {
				let ts = Date.parse(timestamp)
				await this.model.putData(ts, density)
			}

			if (endTimestamp < Date.now())
				this.#startTimestamp = endTimestamp
		} catch (err) {
			console.log(err)
		}

		setTimeout(() => this.#update(), this.#getUpdateInterval() * 1000)
	}
}