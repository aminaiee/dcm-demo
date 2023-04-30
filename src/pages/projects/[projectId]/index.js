import {getCalibrationIds} from "@/modules/dcm";
import Link from "next/link";

export default function Page(props) {
  let {projectId, calibrations} = props

  return (
    <ul>
      {
        calibrations.map(id => {
          return (
            <li key={id}>
              <Link href={`/projects/${projectId}/${id}`}> Calibration {id} </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

Page.getInitialProps = async (ctx) => {
  let {projectId} = ctx.query
  try {
    let res = await getCalibrationIds(projectId)
    return {projectId, calibrations: res}
  } catch (err) {
    console.log(err)
    return {}
  }
}