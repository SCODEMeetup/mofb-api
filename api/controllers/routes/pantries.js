const express = require("express");
const app = express();
const request = require("request");

const host = "https://ckan.smartcolumbusos.com/";
const resourceId = "570a8e02-fb0e-4cee-895b-3b32bd740650";
const queryHost =
  "https://ckan.smartcolumbusos.com/api/3/action/datastore_search_sql?";

// NOTE: query returns max of 100. to get next 100 we need to do the following query
// '/api/action/datastore_search?offset=100&resource_id=570a8e02-fb0e-4cee-895b-3b32bd740650'
app.get("/", function(req, res) {
  const limit = req.query.limit || 100; // query will only return 100 results.
  const pageNumber = req.query.pageNumber || 1;

  const offset = limit * (pageNumber - 1);
  const uri = `${host}api/action/datastore_search?resource_id=${resourceId}&offset=${offset}&limit=${limit}`;
  sendRequest(uri, res);
});
// NOTE: query returns max of 100. to get next 100 we need to do the following query
// '/api/action/datastore_search?offset=100&resource_id=570a8e02-fb0e-4cee-895b-3b32bd740650'
app.get("/:zipCode", function(req, res) {
  const limit = req.query.limit || 100;
  const zipCode = req.params.zipCode;
  const pageNumber = req.query.pageNumber || 1;

  const offset = limit * (pageNumber - 1);
  const uri = `${host}api/action/datastore_search?offset=${offset}&resource_id=${resourceId}&limit=${limit}&q=${zipCode}`;
  sendRequest(uri, res);
});

app.get("/query", function(req, res) {
  const currentlyActive = req.query.currentlyActive;
  const showAccessible = req.query.handicapAccessible;
  const limit = req.query.limit;

  let uri = `${queryHost}sql=SELECT*FROM"570a8e02-fb0e-4cee-895b-3b32bd740650"`;
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
    if (error) {
      console.log("error:", error); // Print the error if one occurred
    }
    // console.log('body:', body);
    res.send(body.result.records);
  });
}

module.exports = app;
