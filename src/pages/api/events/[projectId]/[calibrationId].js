import {DCMProject} from "@/modules/models/project";


export default function handler(request, response) {
  const {projectId, calibrationId} = request.query

  let p = new DCMProject(projectId, calibrationId)

  p.addFlowEventListener(({timestamp, speed}) => {
    if (!response.finished) {
      const eventString = `id: 1\nevent: flow\ndata: {"x": ${timestamp}, "y": ${speed}}\n\n`
      //eventHistory.push(eventString);
      response.write(eventString);
      //response.write(JSON.stringify({timestamp, speed}));
    }
  })

  console.log(`Request url: ${request.url}`);

  request.on('close', () => {
    console.log('request closed')
    p.close()
    //closeConnection(response);
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


/*
  const eventHistory = [];

  checkConnectionToRestore(request, response, eventHistory);

  sendEvents(response, eventHistory);
} else {
  response.writeHead(404);
  response.end();
}
}).listen(5000, () => {
  console.log('Server running at http://127.0.0.1:5000/');
});

function sendEvents(response, eventHistory) {
  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 1\nevent: flightStateUpdate\ndata: {"flight": "I768", "state": "landing"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 3000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 2\nevent: flightStateUpdate\ndata: {"flight": "I768", "state": "landed"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 6000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 3\nevent: flightRemoval\ndata: {"flight": "I768"}\n\n';
      response.write(eventString);
      eventHistory.push(eventString);
    }
  }, 9000);

  setTimeout(() => {
    if (!response.finished) {
      const eventString = 'id: 4\nevent: closedConnection\ndata: \n\n';
      eventHistory.push(eventString);
    }
  }, 12000);
}

function closeConnection(response) {
  if (!response.finished) {
    response.end();
    console.log('Stopped sending events.');
  }
}

function checkConnectionToRestore(request, response, eventHistory) {
  if (request.headers['last-event-id']) {
    const eventId = parseInt(request.headers['last-event-id']);

    eventsToReSend = eventHistory.filter((e) => e.id > eventId);

    eventsToReSend.forEach((e) => {
      if (!response.finished) {
        response.write(e);
      }
    });
  }
}
*/