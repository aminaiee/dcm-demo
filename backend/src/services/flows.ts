import config from '../config/server'
import { Flows } from '../../../src/modules/models/base'
import { ONE_DAY_IN_MSEC } from '../utils/datetime';
import { getFlows } from '../api/dcm';




export class FlowsUpdater {
	flow: Flows
	#startTimestamp: number

	constructor(projectId: string, calibrationId: string) {
		this.flow = new Flows(projectId, calibrationId)
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
		const lastTimestamp = await this.flow.getLastTimestamp()
		console.log("+++++++++++++++++++++++++++++", lastTimestamp, this.#startTimestamp)
		this.#startTimestamp = Math.max(this.#startTimestamp, lastTimestamp)
		let calibrationId = this.flow.calibrationId
		let endTimestamp = this.#startTimestamp + ONE_DAY_IN_MSEC

		try {
			let data = await getFlows(calibrationId, this.#startTimestamp, endTimestamp)
			for (const { timestamp, speed } of data) {
				let ts = Date.parse(timestamp)
				await this.flow.putData(ts, speed)
			}

			if (endTimestamp < Date.now())
				this.#startTimestamp = endTimestamp
		} catch (err) {
			console.log(err)
		}

		setTimeout(() => this.#update(), this.#getUpdateInterval() * 1000)
	}
}