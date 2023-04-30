export const subtractDaysFromDate = (date, days) => {
	date = new Date(date)
	date.setTime(date.getTime() - days * 24 * 60 * 60 * 1000)
	return date
}

export const addDaysToDate = (date, days) => {
	date = new Date(date)
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
	return date
}

export const getDate = (days) => {
	let time = Date.now() - days * ONE_DAY_IN_MSEC
	let date = new Date(time)
	return date
}

export const ONE_DAY_IN_MSEC = 86400000 //TODO