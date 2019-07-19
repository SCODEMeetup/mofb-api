# Community Service Locator API
1. API site: https://mofb-api.appspot.com/api/v2/taxonomy
1. UI Site: https://scode-test.appspot.com/
2. Community services repos:
    1. UI: https://github.com/SCODEMeetup/community-services-locator-ui
    2. API: https://github.com/SCODEMeetup/mofb-api
3. Project Board: https://github.com/orgs/SCODEMeetup/projects/8
4. [Project Introduction](https://scodemeetup.github.io/locator-jekyll/)

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

## Documentation
   1. [Swagger documentation](https://mofb-api.appspot.com/api-docs/)

## Environment

#### Travis CI for build
1. When a PR is opened Travis CI will run the build automatically as a pre-requisite for merging.
2. You can check the status of Travis CI build in your Pull Request.  

#### GCP (google cloud platform), automated app engine deployment
1. Some examples (please visit the swagger documentation for more details)
   1. Taxonomies - 
       1. all - https://mofb-api.appspot.com/api/v2/taxonomy, 
       2. by id - https://mofb-api.appspot.com/api/v2/taxonomy/{id}, e.g. 10
       3. *Immediate* subcategory of a taxonomy id (immediate children) - https://mofb-api.appspot.com/api/v2/taxonomy/{id}/children, e.g. 10
       4. "Food" taxonomy and *all* its sub categories - https://mofb-api.appspot.com/api/v2/taxonomy/food
   2. Agencies - 
       1. all - https://mofb-api.appspot.com/api/v2/agency
       2. by agency id - https://mofb-api.appspot.com/api/v2/agency/{id}, e.g. 5120
       3. by taxonomy id - https://mofb-api.appspot.com/api/v2/agency?taxonomyId=11
   3. Location -
       1. by multiple agencies and taxonomy id https://mofb-api.appspot.com/api/v2/location?agencyId=39650,39651&taxonomyId=12
       2. by location and service id, https://mofb-api.appspot.com/api/v2/location/39651/service/12 
   
## Data

1. Taxonomy: This dataset explains the taxonomy codes applicable to different types of
   services
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/371dd944_411c_4851_a065_9f3f605ddfb9
2. Agency: 
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/6425f64b_f162_4cd4_b271_5038b6752df5  
3. Agency Location:
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/570a8e02_fb0e_4cee_895b_3b32bd740650
4. Service Location: This dataset contains additional information about the service locations, such as hours of operation:
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/ec24773c_7cff_4589_9e2f_bcdeb5cdfd48  
5. Service Taxonomy: This dataset presents the details about the taxonomy codes applicable
   to each agency. In other words, services offered at each agency are presented
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/2a919af7_12d3_47a4_b86a_56692e2e1623
6. Agency Service: 
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/49b19dab_a7a8_4049_add2_7a0a1f0cce07
7. Agency Consolidated: As the SCOS version doesn't support joining multiple datasets (per July 2019) we loaded a consolidated dataset that combines  agency, agency_service and service_taxonomy
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/agency_consolidated  
8. Location Consolidated: As the SCOS version doesn't support joining multiple datasets (per July 2019) we loaded a consolidated dataset that combines agency_location, service_location, agency_service, service_taxonomy
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/location_consolidated   
7. Images

   1. ![Services aka Taxonomies with subcategories as graph](/extra/services-taxanomy-hierarchy.png)
   2. ![Services aka Taxonomies with subcategories as table](/extra/services-hierarchy-table.png)
   3. ![Agency and Services relation](/extra/agency-services-relation.png)
