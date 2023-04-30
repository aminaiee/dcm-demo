export const getDate = (days) => {
	let time = Date.now() - days * ONE_DAY_IN_MSEC
	let date = new Date(time)
	return date
}

export const getStartOfDate = (date) => {
	date.setHours(0, 0, 0, 0)
	return date
}

export const ONE_DAY_IN_MSEC = 86400000 //TODO