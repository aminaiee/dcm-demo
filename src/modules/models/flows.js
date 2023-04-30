import config from "@/config";
import {ModelBase} from "./base"
import {ONE_DAY_IN_MSEC, getDate} from '@/utils/datetime';
import {getFlows} from "@/modules/dcm";

export class Flows extends ModelBase {
	#startTimestamp

	constructor(projectId, calibrationId, updateInterval = 60) {
		super(projectId, calibrationId, updateInterval)
		this.#startTimestamp = getDate(config.dataRetentionDays).getTime()
	}

	async onFetchData() {
		if (this.isClosed)
			return

		let now = Date.now()
		let endTimestamp = this.#startTimestamp + ONE_DAY_IN_MSEC

		try {
			let data = await getFlows(this.calibrationId, this.#startTimestamp, endTimestamp)
			for (const {timestamp, speed} of data) {
				this.sendEvent({
					timestamp: Date.parse(timestamp),
					speed
				})
			}

			this.#startTimestamp = Math.min(now, endTimestamp)
			setTimeout(
				() => this.onFetchData(),
				this.#startTimestamp == now ? this.updateInterval * 1000 : 100
			)
		} catch (err) {
			console.log(err)
			setTimeout(() => this.onFetchData(), 1000)
		}
	}
}
