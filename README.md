# Mid Ohio Food bank API

## Product Description and requirements
[Requirements](https://github.com/SCODEMeetup/mofb-api/blob/master/product-spec.md)

## Pre-requisites
1. Install Node.js from [installer](https://nodejs.org/en/)
2. Or using [command line](https://nodejs.org/en/download/package-manager/)

## Build / Run
1. Run `npm i` to install all node modules
2. Start server using
```bash
$ npm run start
```
3. Server runs at localhost:3000
```
NOTES:
° All queries default limit to 100. If you want more results returned than that, you must pass in the limit query parameter.
° All queries support grabbing the next page of data. Just pass in the query parameter pageNumber=#
 ```
   1. Bring all pantries - http://localhost:3000/pantries
   2. Limit to a zip code - http://localhost:3000/pantries/43215

## Docker build
1. Run `npm i` to install all node modules
2. Run `docker-compose build` to build the image
3. Run `docker-compose up` to start image
4. Server runs at localhost:3000, access via http://localhost:3000/pantries
5. To access the swagger documentation navigate to http://localhost:3000/api-docs

## Tech Stack
1. Node.js
2. Mongodb

## Tools
1. [VSCode](https://code.visualstudio.com/)

## Adding a new endpoint
1. Create the endpoint in server.js
2. Create the swagger documentation (see swagger.yaml file)

## Environment
GCP (google cloud platform)
1. Pantries - https://hotspots-1527564656239.appspot.com/pantries
