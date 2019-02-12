const express = require("express");
const app = express();
const requestUtils = require("../../../utils/request");
const queryUtils = require("../../../utils/query");
const constants = require("../../../constants");

const config = require("../../../../config")[constants.getEnv()];
const host = config.host;
const agencyLocationResourceId = config.agency_location_resource;
const serviceLocationResourceId = config.service_location_resource;
const tableName = "agency_location";

const uri = `${host}/api/3/action/datastore_search_sql?sql=`;

const queryFields = `
    ${tableName}."LOCATION_ID", ${tableName}."STREET_1", ${tableName}."STREET_2", ${tableName}."ZIP", ${tableName}."NAME",
    ${tableName}."PHONE_AREA_CODE", ${tableName}."PHONE_NUMBER", ${tableName}."PHONE_EXTENSION", ${tableName}."HANDICAP_ACCESS", 
    service_location."HOURS"
`;
const query = `
    SELECT ${queryFields} FROM "${agencyLocationResourceId}" ${tableName} 
    INNER JOIN "${serviceLocationResourceId}" service_location ON ${tableName}."AGENCY_ID" = service_location."AGENCY_ID"
    AND ${tableName}."LOCATION_ID" = service_location."LOCATION_ID"
`;

/**
 * Get Request for locations
 */
app.get("/", function (req, res) {
    let filter = '';
    let requestBody = '';
    if (req.query.taxonomyId) {
        requestBody = queryUtils.joinTables;
        filter = getFilters(filter, `service_taxonomy."TAXON_ID" = ${req.query.taxonomyId}`);
    }
    if (req.query.agencyId) {
        filter = getFilters(filter, `${tableName}."AGENCY_ID" = ${req.query.agencyId}`);
    }
    requestBody = uri + query + requestBody;
    const queryString = queryUtils.getQueryString(req, requestBody, filter, tableName);
    requestUtils.sendRequest(queryString, res);
});

function getFilters(existingFilters, addFilter) {
    if (existingFilters) {
        return existingFilters + ` AND ${addFilter}`;
    }
    return addFilter;
}

/**
 * Get Request for single location by location ID and service ID
 */
app.get("/:id/service/:serviceId", function (req, res) {
    let requestBody = query + queryUtils.joinTables;
    const queryString = uri + requestBody +
        queryUtils.setDefaultFilters(`${tableName}."LOCATION_ID" = ${req.params.id} AND service_taxonomy."TAXON_ID" = ${req.params.serviceId}`, tableName);
    requestUtils.sendRequest(queryString, res);
});

module.exports = app;