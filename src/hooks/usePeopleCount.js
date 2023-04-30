import {useEffect, useState} from "react";

export default function usePeopleCount({headcounts, timeWindowSec}) {
	timeWindowSec = timeWindowSec || (5 * 60)
	let [count, setCount] = useState(0)

	useEffect(() => {
		let minValidTime = Date.now() - timeWindowSec * 1000

		let mostRecent = headcounts.reduce((accumulator, item) => {
			if (item.x > accumulator.x && item.x > minValidTime) {
				return item
			} else {
				return accumulator
			}
		}, {x: 0, y: 0})

		setCount(mostRecent.y)
	}, [headcounts, timeWindowSec])

	return count
}
