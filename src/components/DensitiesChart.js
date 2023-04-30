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


export default function DensitiesChart({densities, numberOfDays}) {
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
				text: 'Densities',
			},
		},
	}

	const data = {
		labels: [...Array(numberOfDays).keys()].map(day => {
			return getDate(day)
		}),
		datasets: [
			{
				data: densities,
				borderColor: 'rgb(132, 99, 255)',
				backgroundColor: 'rgba(132, 99, 255, 0.5)',
			},
		],
	};

	useEffect(() => {
		const chart = chartRef.current
		chart.update()
	}, [densities])

	return <Line ref={chartRef} options={options} data={data} />
}
