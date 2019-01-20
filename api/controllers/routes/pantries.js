const express = require("express");
const app = express();
const request = require("request");

const env = process.env.NODE_ENV || 'development';

const config = require("../../../config")[env];
const host = config.host;
const resourceId = config.resourceId;
const uri = `${host}/api/action/datastore_search?resource_id=${resourceId}`;

app.get("/", function(req, res) {
  const { offset, limit } = getQueryParams(req);
  sendRequest(getRequestUri(offset, limit), res);
});

app.get("/:zipCode", function(req, res) {
  const zipCode = req.params.zipCode;
  const { offset, limit } = getQueryParams(req);
  sendRequest(getRequestUri(offset, limit, `q=${zipCode}`), res);
});

app.get("/query", function(req, res) {
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

  sendRequest(uri, res);
});

function getQueryParams(req) {
  const limit = req.query.limit || 100;
  const pageNumber = req.query.pageNumber || 1;

  const offset = limit * (pageNumber - 1);
  return {
    offset,
    limit
  }
}

function getRequestUri(offset, limit, queryParams) {
  let reqUri = uri + `&offset=${offset}&limit=${limit}`;
  if(queryParams) {
    reqUri += `&${queryParams}`;
  }
  return reqUri;
}

function sendRequest(uri, res) {
  const options = {
    body: {},
    headers: {
      "Content-Type": "application/json"
    },
    json: true,
    method: "GET",
    uri
  };

  request(options, function(error, response, body) {
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    if (error || !body.success) {
      console.log(body.error.__type);
      console.log(body.error.__extras);
      res.status(400).send("Could not complete request");
    }
    else {
      res.send(body.result.records);
    }
  });
}

module.exports = app;
