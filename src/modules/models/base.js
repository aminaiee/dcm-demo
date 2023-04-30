
export class ObservableModel {
	#observer

	constructor() {
		this.#observer = undefined
	}

	addEventListener(handler) {
		this.#observer = handler
	}

	putData(d) {
		this.#observer?.(d)
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