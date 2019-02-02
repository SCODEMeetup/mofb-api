const express = require("express");
const app = express();
const requestUtils = require("../../utils/request");
const constants = require("../../constants");

const config = require("../../../config")[constants.getEnv()];
const host = config.host;
const resourceId = config.pantry_resource;
const uri = `${host}/api/action/datastore_search?resource_id=${resourceId}`;

app.get("/", function (req, res) {
  requestUtils.sendRequest(requestUtils.getRequestUri(req, uri), res);
});

app.get("/:zipCode", function (req, res) {
  const zipCode = req.params.zipCode;
  requestUtils.sendRequest(requestUtils.getRequestUri(req, uri, `q=${zipCode}`), res);
});

app.get("/query", function (req, res) {
  const queryHost = host + "/api/3/action/datastore_search_sql?";
  const currentlyActive = req.query.currentlyActive;
  const showAccessible = req.query.handicapAccessible;
  const limit = req.query.limit;

  let uri = `${queryHost}/sql=SELECT*FROM"${resourceId}"`;
  if (currentlyActive) {
    const queryActive = currentlyActive === "true";
    uri = `${uri}WHERE"ACTIVE_FLAG"=${queryActive ? "'Y'" : "'N'"}`;
  }

  if (showAccessible) {
    const queryAccessible = showAccessible === "true";
    uri = `${uri}${currentlyActive ? "AND" : "WHERE"}"HANDICAP_ACCESS"=${
      queryAccessible ? "'Y'" : "'N'"
    }`;
  }

  if (limit) {
    uri = `${uri}LIMIT'${limit}'`;
  }

  requestUtils.sendRequest(uri, res);
});

module.exports = app;