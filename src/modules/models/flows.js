import config from "@/config";
import {ObservableModel} from "./base"
import {ONE_DAY_IN_MSEC} from '@/utils/datetime';
import {getFlows} from "@/modules/dcm";

export class Flows extends ObservableModel {
	#startTimestamp
	#updateInterval
	#closed

	constructor(projectId, calibrationId, updateInterval = 60) {
		super()
		this.projectId = projectId
		this.calibrationId = calibrationId
		this.#updateInterval = updateInterval
		this.#startTimestamp = Date.now() - config.dataRetentionDays * ONE_DAY_IN_MSEC
		this.#closed = true
	}

	start() {
		this.#closed = false
		this.#update()
	}

	close() {
		this.#closed = true
	}

	async #update() {
		if (this.#closed)
			return

		let now = Date.now()
		let endTimestamp = this.#startTimestamp + ONE_DAY_IN_MSEC

		try {
			let data = await getFlows(this.calibrationId, this.#startTimestamp, endTimestamp)
			for (const {timestamp, speed} of data) {
				this.putData({
					timestamp: Date.parse(timestamp),
					speed
				})
			}

			this.#startTimestamp = Math.min(now, endTimestamp)
			setTimeout(
				() => this.#update(),
				this.#startTimestamp == now ? this.#updateInterval * 1000 : 100
			)
		} catch (err) {
			console.log(err)
			setTimeout(() => this.#update(), 1000)
		}
	}
}

export const getFlowsExt = async (calibrationId, startTimestamp, endTimestamp) => {
	let data = []

	while (startTimestamp < endTimestamp) {
		let _end = Math.min(startTimestamp + ONE_DAY_IN_MSEC, endTimestamp)
		let flows = await getFlows(calibrationId, startTimestamp, _end)
		flows = flows.map(({timestamp, speed}) => {
			return {
				timestamp: Date.parse(timestamp),
				speed
			}
		})
		data.push(flows)
		startTimestamp = _end
	}

	return data
}