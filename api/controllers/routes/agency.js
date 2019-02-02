const express = require("express");
const app = express();
const requestUtils = require("../../utils/request");
const queryUtils = require("../../utils/query");
const constants = require("../../constants");

const env = process.env.NODE_ENV || constants.development;

const config = require("../../../config")[env];
const host = config.host;
const agencyResourceId = config.agency_resource;
const agencyServiceResourceId = config.agency_service_resource;
const serviceTaxonomyResourceId = config.service_taxonomy_resource;

const uri = `${host}/api/3/action/datastore_search_sql?sql=SELECT * FROM "${agencyResourceId}" agency `;

app.get("/", function (req, res) {
    let query = '';
    if (req.query.taxonomyId) {
        query =
            `
            INNER JOIN "${agencyServiceResourceId}" agency_service ON agency."AGENCY_ID" = agency_service."AGENCY_ID" 
            INNER JOIN "${serviceTaxonomyResourceId}" service_taxonomy ON agency_service."AGENCY_ID" = service_taxonomy."AGENCY_ID" 
            AND agency_service."LINE_NUMBER" = service_taxonomy."LINE_NUMBER" 
            WHERE service_taxonomy."TAXON_ID" = ${req.query.taxonomyId}
        `;
    }
    requestUtils.sendRequest(queryUtils.getQueryString(req, uri + query), res);
});

app.get("/:id", function (req, res) {
    requestUtils.sendRequest(uri + ` WHERE "AGENCY_ID" = ${req.params.id}`, res);
});

module.exports = app;