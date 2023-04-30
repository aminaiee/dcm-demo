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

export const options = {
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
			text: 'Temperatures',
		},
	},
};

export default function TemperaturesChart({temperatures}) {
	const chartRef = useRef()

	const data = {
		labels: [...Array(10).keys()].map(day => {
			return getDate(day)
		}),
		datasets: [
			{
				data: temperatures,
				borderColor: 'rgb(99, 255, 99)',
				backgroundColor: 'rgba(99, 255, 99, 0.5)',
			},
		],
	};

	useEffect(() => {
		const chart = chartRef.current
		chart.update()
	}, [temperatures])

	return <Line ref={chartRef} options={options} data={data} />
}
