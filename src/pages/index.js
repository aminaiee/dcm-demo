import {useEffect} from "react"
import {Chart} from "chart.js";
import {getCalibrationIds} from "@/modules/dcm";
import config from "@/config";
import Link from "next/link";

export default function Index(props) {

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <ul>
      {
        props.calibrations.map(id => {
          return (
            <li key={id}>
              <Link href={`/project/${id}`}> Calibration {id} </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

Index.getInitialProps = async (ctx) => {
  try {
    let res = await getCalibrationIds(config.dcm.projectId)
    return {calibrations: res}
  } catch (err) {
    console.log(err)
    return {}
  }
}