import {getFlows} from '@/api/dcm';
import {subtractDaysFromDate, addDaysToDate} from '@/utils/datetime';
import TimeSeries from './timeseries';

const useFlows = () => {
	console.log('preloading...')
	let startTime = subtractDaysFromDate(new Date(), 20)

	setInterval(() => {
		if (startTime < Date.now()) {
			let endTime = addDaysToDate(startTime, 1)
			console.log(startTime, endTime)
			getFlows(3, startTime, endTime).then(res => console.log(res)).catch(err => console.log(err))
			getFlows(4, startTime, endTime).then(res => console.log(res)).catch(err => console.log(err))
			getFlows(5, startTime, endTime).then(res => console.log(res)).catch(err => console.log(err))
			getFlows(1915822402, startTime, endTime).then(res => console.log(res)).catch(err => console.log(err))
			startTime = endTime
		}
	}, 100)
}

export default useFlows


export class Flows {
	constructor(projectId, calibrationId, dataRetentionDays = 7, updateInterval = 60) {
	}

	#fetchData(calibrationId) {
		let startTime = subtractDaysFromDate(new Date(), this.dataRetentionDays)
		setInterval(() => {
			if (startTime < Date.now()) {
				let endTime = addDaysToDate(startTime, 1)
				console.log(startTime, endTime)
				getFlows(3, startTime, endTime).then(res => console.log(res)).catch(err => console.log(err))
				getFlows(4, startTime, endTime).then(res => console.log(res)).catch(err => console.log(err))
				getFlows(5, startTime, endTime).then(res => console.log(res)).catch(err => console.log(err))
				getFlows(1915822402, startTime, endTime).then(res => console.log(res)).catch(err => console.log(err))
				startTime = endTime
			}
		}, updateInterval * 1000)
	}
}