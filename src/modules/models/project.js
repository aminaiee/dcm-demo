import {getCalibrationIds} from "../dcm";
import {Flows} from "./flows";

export class DCMProject {
	#flows

	constructor(projectId, calibrationId) {
		this.projectId = projectId
		this.lastEventId = 0

		this.#flows = new Flows(projectId, calibrationId)
	}

	addFlowEventListener(handler) {
		this.#flows.addEventListener(handler)
	}

	close() {
		this.#flows.close()
	}

	async start() {
		this.#flows.start()

		/*
		let moodUpdater = new MoodsUpdater(this.projectId, calibrationId)
		moodUpdater.start()

		let densityUpdater = new DensitiesUpdater(this.projectId, calibrationId)
		densityUpdater.start()

		let tempUpdater = new TemperaturesUpdater('Sydney', -33.87, 151.21)
		tempUpdater.start()
		*/
	}
}