import {ONE_DAY_IN_MSEC, getDate} from '@/utils/datetime';
import {getDensities} from '../dcm';
import {ModelBase} from './base';
import config from '@/config';

export class Densities extends ModelBase {
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
			let data = await getDensities(this.calibrationId, this.#startTimestamp, endTimestamp)
			for (const {timestamp, density, headcount} of data) {
				this.sendEvent({
					timestamp: Date.parse(timestamp),
					density,
					headcount,
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