import {useEffect, useRef} from "react";

import {getDate} from "@/utils/datetime";
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	TimeSeriesScale,
	Title,
	Tooltip,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import {Line} from 'react-chartjs-2';
import {getAverageGroupedByDay} from "@/utils/timeseries";


ChartJS.register(
	CategoryScale,
	LinearScale,
	TimeSeriesScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);


export default function FlowsChart({flows}) {
	const chartRef = useRef()

	const options = {
		responsive: true,
		scales: {
			x: {
				type: 'time',
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: 'Flows',
			},
		},
	}

	const data = {
		labels: [...Array(10).keys()].map(day => {
			return getDate(day)
		}),
		datasets: [
			{
				data: flows,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	useEffect(() => {
		const chart = chartRef.current
		getAverageGroupedByDay(flows)
		chart.update()
	}, [flows])

	return <Line ref={chartRef} options={options} data={data} />
}
