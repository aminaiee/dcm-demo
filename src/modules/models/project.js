import {Densities} from "./densities";
import {Flows} from "./flows";
import {Moods} from "./moods";
import {Temperatures} from "./temperatures";

export class DCMProject {
	constructor(projectId, calibrationId) {
		this.projectId = projectId
		this.lastEventId = 0

		this.flows = new Flows(projectId, calibrationId)
		this.moods = new Moods(projectId, calibrationId)
		this.densities = new Densities(projectId, calibrationId)
		this.temperatures = new Temperatures(projectId, calibrationId, -33.87, 151.21)

	}

	close() {
		this.flows.close()
		this.moods.close()
		this.densities.close()
		this.temperatures.close()
	}

	async start() {
		this.flows.start()
		this.moods.start()
		this.densities.start()
		this.temperatures.start()
	}
}