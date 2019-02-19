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

## Running tests

```bash
$ npm test
```
## Docker build

1. Run `npm i` to install all node modules
2. Run `docker-compose build` to build the image
3. Run `docker-compose up` to start image
4. To access the swagger documentation navigate to http://localhost:3000/api-docs or http://{env}/api-docs/

## Tech Stack

1. Node.js
2. Express
3. ChaiJS 
4. MochaJS 
5. Swagger

## Tools

1. [VSCode](https://code.visualstudio.com/)

## Adding a new endpoint

1. Create the endpoint in router file
2. Write test for endpoint
3. If necessary, import the router file in server.js
4. Create/update the swagger documentation (see swagger.yaml file)

## Environment

#### Travis CI for build
1. When a PR is opened Travis CI will run the build automatically as a pre-requisite for merging.
2. You can check the status of Travis CI build in your Pull Request.  

#### GCP (google cloud platform), automated app engine deployment

1. Swagger documentation - https://mofb-api.appspot.com/api-docs/ 
2. Existing endpoints (please see the swagger documentation for more details)
   1. Taxonomies - 
       1. all - https://mofb-api.appspot.com/api/v1/taxonomy, 
       2. by id - https://mofb-api.appspot.com/api/v1/taxonomy/{id}, e.g. 10
       3. *Immediate* subcategory of a taxonomy id (immediate children) - https://mofb-api.appspot.com/api/v1/taxonomy/{id}/children, e.g. 10
       4. "Basic needs" taxonomy and *all* its sub categories - https://mofb-api.appspot.com/api/v1/taxonomy/basic-needs
   2. Agencies - 
       1. all - https://mofb-api.appspot.com/api/v1/agency
       2. by agency id - https://mofb-api.appspot.com/api/v1/agency/{id}, e.g. 5120
       3. by taxonomy id = https://mofb-api.appspot.com/api/v1/agency?taxonomyId=11 
   
## Data

1. taxonomy.csv: This dataset explains the taxonomy codes applicable to different types of
   services
   https://ckan.smartcolumbusos.com/dataset/food-pantry-and-user-data/resource/371dd944-411c-4851-a065-9f3f605ddfb9
2. agency.csv: This dataset identifies the locations of agencies across Central Ohio region
   https://ckan.smartcolumbusos.com/dataset/food-pantry-and-user-data/resource/570a8e02-fb0e-4cee-895b-3b32bd740650
3. service_taxonomy.csv : This dataset presents the details about the taxonomy codes applicable
   to each agency. In other words, services offered at each agency are presented
   https://ckan.smartcolumbusos.com/dataset/food-pantry-and-user-data/resource/2a919af7-12d3-47a4-b86a-56692e2e1623
4. service_location.csv : This dataset contains additional information about the service locations,
   such as hours of operation:
   https://ckan.smartcolumbusos.com/dataset/b0390b58-35c9-45e8-8a2d-d2472b20d65f/resource/ec24773c-7cff-4589-9e2f-bcdeb5cdfd48/download/service_location.csv
5. Images

   1. ![Services aka Taxonomies with subcategories as graph](/extra/services-taxanomy-hierarchy.png)
   2. ![Services aka Taxonomies with subcategories as table](/extra/services-hierarchy-table.png)
   3. ![Agency and Services relation](/extra/agency-services-relation.png)
