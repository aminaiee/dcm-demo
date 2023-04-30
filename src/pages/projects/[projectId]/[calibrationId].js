import {useRouter} from "next/router";

import DensitiesChart from "@/components/DensitiesChart";
import FlowsChart from "@/components/FlowsChart";
import HeadcountChart from "@/components/HeadcountChart";
import MoodsChart from "@/components/MoodsChart";
import PeackAverageChart from "@/components/PeakAverageChart";
import PeopleCount from "@/components/PeopleCount";
import TemperaturesChart from "@/components/TemperaturesChart";
import useLiveData from "@/hooks/useLiveData";
import {getAverageGroupedByDay, getPeakGroupedByDay} from "@/utils/timeseries";


export default function Page() {
  const router = useRouter()
  const {calibrationId, projectId} = router.query
  let {flows, moods, densities, headcounts, temperatures} = useLiveData({projectId, calibrationId})

  return (
    <div id="root">
      <div style={{maxHeight: "200px", display: "flex", flexDirection: "row"}}>
        <DensitiesChart densities={densities} />
        <MoodsChart moods={moods} />
        <FlowsChart flows={flows} />
        <TemperaturesChart temperatures={temperatures} />
      </div>
      <div style={{maxHeight: "200px", display: "flex", flexDirection: "row"}}>
        <PeackAverageChart
          average={getAverageGroupedByDay(densities)}
          max={getPeakGroupedByDay(densities)}
          title={"Peak / Average Density"}
        />
        <PeackAverageChart
          average={getAverageGroupedByDay(moods)}
          max={getPeakGroupedByDay(moods)}
          title={"Peak / Average Mood"}
        />
        <PeackAverageChart
          average={getAverageGroupedByDay(flows)}
          max={getPeakGroupedByDay(flows)}
          title={"Peak / Average Flow"}
        />
        <PeackAverageChart
          average={getAverageGroupedByDay(temperatures)}
          max={getPeakGroupedByDay(temperatures)}
          title={"Peak / Average Temperature"}
        />
      </div>
      <div style={{maxHeight: "200px", display: "flex", flexDirection: "row"}}>
        <HeadcountChart headcounts={headcounts} />
      </div >
      <div style={{maxHeight: "200px", display: "flex", flexDirection: "row"}}>
        <div style={{minWidth: "200px", verticalAlign: "bottom"}}>
          <PeopleCount headcounts={headcounts} maxPeopleCount={5} />
        </div >
      </div >
    </div>
  )
}

