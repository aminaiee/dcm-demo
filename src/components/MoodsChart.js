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
import config from "@/config";


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

export default function MoodsChart({moods, numberOfDays}) {
	const chartRef = useRef()
	numberOfDays = numberOfDays || config.dataRetentionDays

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
				text: 'Moods',
			},
		},
	}

	const data = {
		labels: [...Array(numberOfDays).keys()].map(day => {
			return getDate(day)
		}),
		datasets: [
			{
				data: moods,
				borderColor: 'rgb(99, 255, 132)',
				backgroundColor: 'rgba(99, 255, 132, 0.5)',
			},
		],
	};

	useEffect(() => {
		const chart = chartRef.current
		chart.update()
	}, [moods])

	return <Line ref={chartRef} options={options} data={data} />
}
