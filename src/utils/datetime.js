export const getDate = (days) => {
	let time = Date.now() - days * ONE_DAY_IN_MSEC
	let date = new Date(time)
	return date
}

export const getStartOfDate = (days) => {
	let time = Date.now() - days * ONE_DAY_IN_MSEC
	let date = new Date(time)
	return new Date(date.getFullYear(), date.getMonth(), date.getDay())
}

export const ONE_DAY_IN_MSEC = 86400000 //TODO


console.log(getDate(0).toDateString())
console.log(getStartOfDate(0).toDateString())