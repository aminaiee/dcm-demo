import { getCalibrationIds } from "../api/dcm";
import { DensitiesUpdater } from "./densities";
import { FlowsUpdater } from "./flows";
import { MoodsUpdater } from "./moods";
import { TemperaturesUpdater } from "./temperatures";

export class DCMProject {
	projectId: string

	constructor(projectId: string) {
		this.projectId = projectId
	}

	async start() {
		let calibrationIdList = await getCalibrationIds(this.projectId)
		calibrationIdList.forEach(async calibrationId => {
			let flowUpdater = new FlowsUpdater(this.projectId, calibrationId)
			flowUpdater.start()

			let moodUpdater = new MoodsUpdater(this.projectId, calibrationId)
			moodUpdater.start()

			let densityUpdater = new DensitiesUpdater(this.projectId, calibrationId)
			densityUpdater.start()
		});

		let tempUpdater = new TemperaturesUpdater('Sydney', -33.87, 151.21)
		tempUpdater.start()
	}
}