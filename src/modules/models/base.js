
export class ModelBase {
	#observer

	constructor(projectId, calibrationId, updateInterval = 60) {
		this.projectId = projectId
		this.calibrationId = calibrationId
		this.updateInterval = updateInterval
		this.#observer = undefined
		this.isClosed = true
	}

	start() {
		this.isClosed = false
		this.onFetchData()
	}

	close() {
		this.isClosed = true
	}

	addEventListener(handler) {
		this.#observer = handler
	}

	sendEvent(d) {
		this.#observer?.(d)
	}

	onFetchData() {
		//overriden
	}
}

/*
export class Moods extends ModelBase {
	constructor(projectId, calibrationId) {
		super()
		this.projectId = projectId
		this.calibrationId = calibrationId
	}
}

export class Temperatures extends ModelBase {
	constructor(location: string) {
		super(`temperature:${location}`, {
			location: location
		})
	}
}
*/