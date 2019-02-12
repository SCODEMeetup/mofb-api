const express = require("express");
const app = express();
const requestUtils = require("../../../utils/request");
const queryUtils = require("../../../utils/query");
const constants = require("../../../constants");

const config = require("../../../../config")[constants.getEnv()];

const host = config.host;
const resourceId = config.taxonomy_resource;
const tableName = "taxonomy";

const uri = `${host}/api/3/action/datastore_search_sql?sql=SELECT * FROM "${resourceId}" ${tableName} `;

/**
 * Get Request for all taxonomy
 */
app.get("/", function (req, res) {
    const level = req.query.level;
    const levelQuery = `"TAXONOMY_LEVEL" = ${level}`;
    const queryString = queryUtils.getQueryString(req, uri, level ? levelQuery : null, tableName);
    requestUtils.getList(queryString, res);
});

/**
 * Get Request for Basic Needs taxonomy
 */
app.get("/basic-needs", function (_req, res) {
    const queryString = uri + queryUtils.setDefaultFilters('"TAXONOMY_CODE" LIKE N\'B%\'', tableName);
    requestUtils.getList(queryString, res);
});

/**
 * Get Request for Taxonomy by ID
 */
app.get("/:id", function (req, res) {
    const queryString = uri + queryUtils.setDefaultFilters(`"TAXON_ID" = ${req.params.id}`, tableName);
    requestUtils.getList(queryString, res);
});

/**
 * Get Request for Taxonomy Subcategories by ID
 */
app.get("/:id/children", function (req, res) {
    const queryString = uri + queryUtils.setDefaultFilters(`"TAXON_ID_SUBCAT_OF" = ${req.params.id}`, tableName);
    requestUtils.getList(queryString, res);
});

module.exports = app;