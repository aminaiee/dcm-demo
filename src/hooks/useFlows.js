import {getFlows} from '@/api/dcm';
import {subtractDaysFromDate, addDaysToDate} from '@/utils/datetime';

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