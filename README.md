# Community Service Locator API

1. API site: https://mofb-api.appspot.com/api-docs/
2. UI Site: https://scode-test.appspot.com/
3. Community services repos:
   1. UI: https://github.com/SCODEMeetup/community-services-locator-ui
   2. API: https://github.com/SCODEMeetup/mofb-api
4. Project Board: https://github.com/orgs/SCODEMeetup/projects/8
5. [Project Introduction](https://scodemeetup.github.io/locator-jekyll/)

## Product Description and requirements

[Requirements](https://github.com/SCODEMeetup/mofb-api/blob/master/product-spec.md)

## Pre-requisites

1. Install Node.js using [nvm](https://github.com/nvm-sh/nvm) (_RECOMMENDED_), or from [installer](https://nodejs.org/en/), or using [command line](https://nodejs.org/en/download/package-manager/)

## Build / Run

1. If Node was installed via `nvm`, run `nvm use` to use the correct version
2. Run `npm i` to install all node modules
3. Copy `.env.example`, rename to `.env`, and update any necessary config
4. Start server using

```bash
$ npm start
```

3. Access Swagger docs at http://localhost:8000/api-docs (endpoints can be tested directly from this page)

## Docker build

1. Run `npm i` to install all node modules
2. Run `docker-compose up` to start image
3. To access the swagger documentation navigate to http://localhost:8000/api-docs or http://{env}/api-docs/

## Tech Stack

1. Node.js
2. TypeScript
3. Express
4. Swagger

## Tools

1. Recommended editor: [VSCode](https://code.visualstudio.com/)

## Adding a new endpoint

1. Create a new function in the corresponding file in `api/controllers`. (If you create a new file, be sure to add it to `index.ts`.) 
   *  Include the relevant `@Path` and `@<method>` decorators from the `typescript-rest` library.
2. Put service logic in the `api/services` directory, general helper/utility logic in `api/utils`, and DTOs in `api/models`.
3. Note that you may have to restart the app for Swagger doc changes to apply.

## Documentation

1.  [Swagger documentation](https://mofb-api.appspot.com/api-docs/)

## Environment

#### Travis CI for build

1. When a PR is opened Travis CI will run the build automatically as a pre-requisite for merging.
2. You can check the status of Travis CI build in your Pull Request.

#### GCP (google cloud platform), automated app engine deployment

## Data

1. Agency: This dataset outlines all information about the agencies that provide services
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/community_services_agencies
2. Category: this dataset contains a list of categories that could describe the service(s) an agency provides
   https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/handson_central_ohio_agency_subcategory_terms