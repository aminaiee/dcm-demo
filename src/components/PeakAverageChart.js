import {useEffect, useRef} from "react";

import {getDate} from "@/utils/datetime";
import {
	BarElement,
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
import {Bar} from 'react-chartjs-2';


ChartJS.register(
	CategoryScale,
	LinearScale,
	TimeSeriesScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

;

export default function PeackAverageChart({average, max, title}) {
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
				display: true,
			},
			title: {
				display: true,
				text: title,
			},
		},
	}

	const chartData = {
		//TODO: use data retention days
		labels: [...Array(10).keys()].map(day => {
			return getDate(day)
		}),
		datasets: [
			{
				label: 'Average',
				data: average,
				borderColor: 'rgb(99, 255, 132)',
				backgroundColor: 'rgba(99, 255, 132, 0.5)',
			},
			{
				label: 'Peak',
				data: max,
				borderColor: 'rgb(99, 99, 132)',
				backgroundColor: 'rgba(99, 99, 132, 0.5)',
			}
		],
	};


	useEffect(() => {
		const chart = chartRef.current
		chart.update()
	}, [average, max])

	return <Bar ref={chartRef} options={options} data={chartData} />
}
