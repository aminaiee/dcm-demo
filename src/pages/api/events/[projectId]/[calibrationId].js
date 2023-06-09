import {DCMProject} from "@/modules/models/project";

export default function handler(request, response) {
  const {projectId, calibrationId} = request.query

  let p = new DCMProject(projectId, calibrationId)



  let closeConnection = () => {
    console.log("Closing connection...")
    p.close()
    if (response.finished || response.writableEnded) {
      response.end();
      console.log('Stopped sending events.');
    }
  }

  let writeEvent = (eventType, data) => {
    if (response.finished) {
      closeConnection()
      return
    }

    const eventString = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`
    response.write(eventString);
    response.flush()
  }

  p.flows.addEventListener(({timestamp, speed}) => {
    writeEvent('flow', {t: timestamp, speed})
  })

  p.moods.addEventListener(({timestamp, mood}) => {
    writeEvent('mood', {t: timestamp, mood})
  })

  p.densities.addEventListener(({timestamp, density, headcount}) => {
    writeEvent('density', {t: timestamp, density, headcount})
  })

  p.temperatures.addEventListener(({timestamp, temperature}) => {
    writeEvent('temperature', {t: timestamp, temperature})
  })

  request.on('close', () => {
    closeConnection()
  });

  request.on('end', () => {
    closeConnection()
  });

  request.on('error', () => {
    closeConnection()
  });

  request.on('aborted', () => {
    closeConnection()
  });

  request.socket.on('close', () => {
    closeConnection()
  })

  response.socket.on('close', () => {
    closeConnection()
  })

  response.on('close', () => {
    closeConnection()
  })

  p.start()
  response.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });
}
