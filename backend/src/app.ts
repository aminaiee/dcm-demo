import config from './config/server'
import { DCMProject } from './services/project'

let project = new DCMProject(config.dcm.projectId || '')
project.start()