import {getCalibrationIds} from "@/modules/dcm";
import Link from "next/link";
import {useEffect} from "react";

export default function Page(props) {
  let {projectId, calibrations} = props

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <ul>
      {
        calibrations.map(id => {
          return (
            <li key={id}>
              <Link href={`/project/${projectId}/${id}`}> Calibration {id} </Link>
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