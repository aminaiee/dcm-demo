import config from '@/config';
import {getTemperatures} from '../wheather';
import {ModelBase} from './base';
import {MSECS_IN_A_DAY, getDate} from '@/utils/datetime';


export class Temperatures extends ModelBase {
	#startTimestamp


	constructor(projectId, calibrationId, latitude, longitude, updateInterval = 300) {
		super(projectId, calibrationId, updateInterval)
		this.#startTimestamp = getDate(config.dataRetentionDays).getTime()
		this.latitude = latitude
		this.longitude = longitude
		this.lastSentTimestamp = 0
	}

	async onFetchData() {
		if (this.isClosed)
			return

		let now = Date.now()
		let endTimestamp = this.#startTimestamp + MSECS_IN_A_DAY

		try {
			let data = await getTemperatures(this.latitude, this.longitude, this.#startTimestamp)
			for (const {timestamp, temperature} of data) {
				if (timestamp > this.lastSentTimestamp) {
					this.sendEvent({timestamp, temperature})
					this.lastSentTimestamp = timestamp
				}
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