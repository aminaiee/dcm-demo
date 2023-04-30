import {useRouter} from "next/router";
import {useEffect, useRef} from "react";

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
import {getDate} from "@/utils/datetime";



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

export const flowData = {
  labels: [...Array(10).keys()].map(day => {
    return getDate(day)
  }),
  datasets: [
    {
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

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
      text: 'Flows',
    },
  },
};

export default function Page() {
  const router = useRouter()
  const {calibrationId, projectId} = router.query
  const chartRef = useRef()

  useEffect(() => {
    const chart = chartRef.current
    console.log(chart)

    if (calibrationId) {
      let eventSource = new EventSource(`/api/events/${projectId}/${calibrationId}`);
      eventSource.addEventListener("flow", e => {
        let {x, y} = JSON.parse(e.data)
        flowData.datasets[0].data.push({x: new Date(x), y})
        //dps.push({x: new Date(x), y})
      })

      let interval = setInterval(() => {
        flowData.datasets[0].data.sort(function (a, b) {
          return a.x.getTime() - b.x.getTime()
        })


        chart.update()
      }, 1000)

      return () => {
        clearInterval(interval)
        eventSource.close()
      }
    }
  }, [calibrationId])

  return (
    <>
      <Line ref={chartRef} options={options} data={flowData} />;
    </>
  )
}
