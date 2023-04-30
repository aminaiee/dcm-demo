import {useEffect, useRef, useState} from 'react';

let data = {
	flows: [],
	moods: [],
	densities: [],
	headcounts: [],
	temperatures: [],
}

export default function useLiveData({projectId, calibrationId}) {
	let [flows, setFlows] = useState([])
	let [moods, setMoods] = useState([])
	let [headcounts, setHeadcounts] = useState([])
	let [densities, setDensities] = useState([])
	let [temperatures, setTemperatures] = useState([])
	let flowsTimer = useRef()
	let moodsTimer = useRef()
	let densitiesTimer = useRef()
	let temperaturesTimer = useRef()

	useEffect(() => {
		if (!projectId || !calibrationId)
			return

		let eventSource = new EventSource(`/api/events/${projectId}/${calibrationId}`);

		eventSource.addEventListener("flow", e => {
			let {t, speed} = JSON.parse(e.data)
			data.flows.push({x: new Date(t), y: speed})

			clearTimeout(flowsTimer.current)
			flowsTimer.current = setTimeout(() => {
				data.flows.sort(function (a, b) {
					return a.x.getTime() - b.x.getTime()
				})
				setFlows(data.flows)
			}, 500)
		})

		eventSource.addEventListener("mood", e => {
			let {t, mood} = JSON.parse(e.data)
			data.moods.push({x: new Date(t), y: mood})

			clearTimeout(moodsTimer.current)
			moodsTimer.current = setTimeout(() => {
				data.moods.sort(function (a, b) {
					return a.x.getTime() - b.x.getTime()
				})
				setMoods(data.moods)
			}, 500)

		})

		eventSource.addEventListener("density", e => {
			let {t, density, headcount} = JSON.parse(e.data)
			if (density)
				data.densities.push({x: new Date(t), y: density})
			if (headcount)
				data.headcounts.push({x: new Date(t), y: headcount})

			clearTimeout(densitiesTimer.current)
			densitiesTimer.current = setTimeout(() => {
				data.densities.sort(function (a, b) {
					return a.x.getTime() - b.x.getTime()
				})
				data.headcounts.sort(function (a, b) {
					return a.x.getTime() - b.x.getTime()
				})
				setDensities(data.densities)
				setHeadcounts(data.headcounts)
			}, 500)

		})


		eventSource.addEventListener("temperature", e => {
			let {t, temperature} = JSON.parse(e.data)
			if (t && temperature)
				data.temperatures.push({x: new Date(t), y: temperature})

			clearTimeout(temperaturesTimer.current)
			temperaturesTimer.current = setTimeout(() => {
				data.temperatures.sort(function (a, b) {
					return a.x.getTime() - b.x.getTime()
				})
				setTemperatures(data.temperatures)
			}, 500)
		})

		return () => {
			data.flows = []
			data.moods = []
			data.densities = []
			data.headcounts = []
			data.temperatures = []
			eventSource.close()
		}
	}, [projectId, calibrationId])

	return {
		flows,
		moods,
		densities,
		headcounts,
		temperatures,
	}
}
