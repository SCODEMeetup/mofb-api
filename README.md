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
3. Server runs at localhost:3000, 
   1. Bring all pantries - http://localhost:3000/pantries
   2. Limit to certain number - http://localhost:3000/pantries/1
   3. Limit to a zip code - 

## Docker build
1. Run `npm i` to install all node modules
2. Run `docker-compose build` to build the image
3. Run `docker-compose up` to start image
4. Server runs at localhost:3000, access via http://localhost:3000/pantries

## Tech Stack
1. Node.js
2. Mongodb

## Tools
1. [VSCode](https://code.visualstudio.com/)
2. [Postman](https://www.getpostman.com/)

