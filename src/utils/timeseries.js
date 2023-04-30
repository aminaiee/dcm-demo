import {ONE_DAY_IN_MSEC, getStartOfDate} from "./datetime"

export const getAverageGroupedByDay = (data) => {
	let endTime = data.reduce((accumulator, item) => Math.max(accumulator, item.x), 0)

	endTime = getStartOfDate(new Date(endTime)).getTime()

	let groups = []
	let currentTime = endTime
	while (data.length > 0) {
		let filtered = data.filter(item => item.x >= currentTime)
		if (filtered.length > 0) {
			let sum = filtered.reduce((accumulator, item) => accumulator + item.y, 0)
			groups.push({x: currentTime, y: sum / filtered.length})
		}

		data = data.filter(item => item.x < currentTime)
		currentTime = currentTime - ONE_DAY_IN_MSEC
	}

	return groups
}

export const getPeakGroupedByDay = (data) => {
	let endTime = data.reduce((accumulator, item) => Math.max(accumulator, item.x), 0)

	endTime = getStartOfDate(new Date(endTime)).getTime()

	let groups = []
	let currentTime = endTime
	while (data.length > 0) {
		let filtered = data.filter(item => item.x >= currentTime)
		if (filtered.length > 0) {
			let max = filtered.reduce((accumulator, item) => Math.max(accumulator, item.y), 0)
			groups.push({x: currentTime, y: max})
		}

		data = data.filter(item => item.x < currentTime)
		currentTime = currentTime - ONE_DAY_IN_MSEC
	}

	return groups
}