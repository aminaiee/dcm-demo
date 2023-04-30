import {DCMProject} from "@/modules/models/project";


export default function handler(request, response) {
  const {projectId, calibrationId} = request.query

  let p = new DCMProject(projectId, calibrationId)

  p.flows.addEventListener(({timestamp, speed}) => {
    if (!response.finished) {
      const eventString = `event: flow\ndata: {"t": ${timestamp}, "speed": ${speed}}\n\n`
      response.write(eventString);
    }
  })


  p.moods.addEventListener(({timestamp, mood}) => {
    if (!response.finished) {
      const eventString = `event: mood\ndata: {"t": ${timestamp}, "mood": ${mood}}\n\n`
      response.write(eventString);
    }
  })


  p.densities.addEventListener(({timestamp, density, headcount}) => {
    if (!response.finished) {
      const eventString = `event: density\ndata: {"t": ${timestamp}, "density": ${density}, "headcount": ${headcount}}\n\n`
      response.write(eventString);
    }
  })

  p.temperatures.addEventListener(({timestamp, temperature}) => {
    if (!response.finished) {
      const eventString = `event: temperature\ndata: {"t": ${timestamp}, "temperature": ${temperature}}\n\n`
      response.write(eventString);
    }
  })

  request.on('close', () => {
    console.log('request closed')
    p.close()
    if (!response.finished) {
      response.end();
      console.log('Stopped sending events.');
    }
  });

  p.start()

  response.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });
}
