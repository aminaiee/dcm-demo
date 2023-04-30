export const MSECS_IN_A_DAY = 86400000

export const getDate = (days) => {
	let time = Date.now() - days * MSECS_IN_A_DAY
	let date = new Date(time)
	return date
}

export const getStartOfDate = (date) => {
	date.setHours(0, 0, 0, 0)
	return date
}
