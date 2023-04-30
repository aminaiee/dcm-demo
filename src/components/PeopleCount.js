import usePeopleCount from '@/hooks/usePeopleCount';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function PeopleCount({headcounts, maxPeopleCount}) {
	let timeWindowSec = 5 * 60
	let count = usePeopleCount({headcounts, timeWindowSec})
	let percent = Math.floor(Math.min(maxPeopleCount, count) / maxPeopleCount * 100)

	let variant = 'info'
	if (count > maxPeopleCount)
		variant = 'danger'
	else if (count > maxPeopleCount / 2)
		variant = 'warning'

	return (
		<>
			People Count: {count}
			<ProgressBar
				now={percent}
				variant={variant}
			/>
		</>
	)
}