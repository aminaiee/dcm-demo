## Prequisites

First, create .env file in the root directory of the project with the following variables defined:
```
DCM_AUTH_CLIENT_ID=<client-id>
DCM_AUTH_CLIENT_SECRET=<client-secret>
DCM_AUTH_DOMAIN=<dcm-auth-domain, for example dcm-test.eu.auth0.com>
DCM_API_BASE_URL=<dcm-api-base-url, for example https://test.service.crowdeagle.com.au/v1>
```

## Running the server

### using docker-compose

Build and run the docker container with the following command. This will start the server on port 3000. If port 3000 is in use on your host, change the port number in [docker-compose.yml](docker-compose.yml)

```
docker-compose up --build
```

### using docker
Build and run the docker container with the following command. This will start the server on port 3000. If port 3000 is in use on your host, change the port number in the command to a different one.

```
docker build -t dcm-demo .
docker run -p 3000:80 -it dcm-demo 
```

### using npm

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## DCM Demo
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. This will redirect you to the default DCM project dashboard at [http://localhost:3000/projects/ce2735c0-91ff-4bb2-a460-309e083f9705/3](http://localhost:3000/projects/ce2735c0-91ff-4bb2-a460-309e083f9705/3)

If you want to see data from another project, change the URL address according to the following format:
```
http://localhost:3000/projects/<project-id>/<calibration-id>
```

The get a list of calibrationIds for the project visit project page (minimal) with the following format:
```
http://localhost:3000/projects/<project-id>
```
For example: [http://localhost:3000/projects/ce2735c0-91ff-4bb2-a460-309e083f9705](http://localhost:3000/projects/ce2735c0-91ff-4bb2-a460-309e083f9705)
