import Router from "next/router"
import {useEffect} from "react"

export default function Index(props) {
  useEffect(() => {
    Router.push('/projects/ce2735c0-91ff-4bb2-a460-309e083f9705/3')
  }, [])

  return <></>
}
