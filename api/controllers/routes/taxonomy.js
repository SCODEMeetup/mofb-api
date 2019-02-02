const express = require("express");
const app = express();
const requestUtils = require("../../utils/request");
const queryUtils = require("../../utils/query");
const constants = require("../../constants");

const env = process.env.NODE_ENV || constants.development;

const config = require("../../../config")[env];
const host = config.host;
const resourceId = config.taxonomy_resource;
const uri = `${host}/api/3/action/datastore_search_sql?sql=SELECT * FROM "${resourceId}"`;

app.get("/", function (req, res) {
    const level = req.query.level;
    const levelQuery = ` WHERE "TAXONOMY_LEVEL" = ${level}`;

    requestUtils.sendRequest(queryUtils.getQueryString(req, level ? uri + levelQuery : uri), res);
});

app.get("/basic-needs", function (_req, res) {
    requestUtils.sendRequest(uri + 'WHERE "TAXONOMY_CODE" LIKE N\'B%\'', res);
});

app.get("/:id", function (req, res) {
    requestUtils.sendRequest(uri + `WHERE "TAXON_ID" = ${req.params.id}`, res);
});

module.exports = app;