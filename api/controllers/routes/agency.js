const express = require("express");
const app = express();
const requestUtils = require("../../utils/request");
const queryUtils = require("../../utils/query");
const constants = require("../../constants");

const config = require("../../../config")[constants.getEnv()];
const host = config.host;
const agencyResourceId = config.agency_resource;
const agencyServiceResourceId = config.agency_service_resource;
const serviceTaxonomyResourceId = config.service_taxonomy_resource;
const tableName = "agency";

const uri = `${host}/api/3/action/datastore_search_sql?sql=SELECT * FROM "${agencyResourceId}" ${tableName} `;

/**
 * Get Request for all Agencies
 */
app.get("/", function (req, res) {
    let query = '';
    let filter = null;
    if (req.query.taxonomyId) {
        query = 
            `
            INNER JOIN "${agencyServiceResourceId}" agency_service ON agency."AGENCY_ID" = agency_service."AGENCY_ID" 
            INNER JOIN "${serviceTaxonomyResourceId}" service_taxonomy ON agency_service."AGENCY_ID" = service_taxonomy."AGENCY_ID" 
            AND agency_service."LINE_NUMBER" = service_taxonomy."LINE_NUMBER"
        `;
        filter = `service_taxonomy."TAXON_ID" = ${req.query.taxonomyId}`;
    }
    query = uri + query;
    requestUtils.sendRequest(queryUtils.getQueryString(req, query, filter,tableName), res);
});

/**
 * Get Request for Agency by ID
 */
app.get("/:id", function (req, res) {
    requestUtils.sendRequest(uri+ queryUtils.setDefaultFilters(`agency."AGENCY_ID" = ${req.params.id}`,tableName), res);
});

module.exports = app;