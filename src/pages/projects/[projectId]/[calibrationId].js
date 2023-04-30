import {useRouter} from "next/router";

import DensitiesChart from "@/components/DensitiesChart";
import FlowsChart from "@/components/FlowsChart";
import HeadcountChart from "@/components/HeadcountChart";
import MoodsChart from "@/components/MoodsChart";
import TemperaturesChart from "@/components/TemperaturesChart";
import useLiveData from "@/hooks/useLiveData";
import 'chartjs-adapter-luxon';


export default function Page() {
  const router = useRouter()
  const {calibrationId, projectId} = router.query
  let {flows, moods, densities, headcounts, temperatures} = useLiveData({projectId, calibrationId})

  return (
    <>
      <div style={{width: "50%", maxHeight: "400px"}}>
        <TemperaturesChart temperatures={temperatures} />
      </div>
      <div style={{width: "50%", maxHeight: "400px"}}>
        <DensitiesChart densities={densities} />
      </div>
      <div style={{width: "50%", maxHeight: "400px"}}>
        <MoodsChart moods={moods} />
      </div>
      <div style={{width: "50%", maxHeight: "400px"}}>
        <FlowsChart flows={flows} />
      </div>
      <div style={{width: "50%", maxHeight: "400px"}}>
        <HeadcountChart headcounts={headcounts} />
      </div>
    </>
  )
}
