var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const request = require('request');
const host = 'https://ckan.smartcolumbusos.com/';
const resourceId = '570a8e02-fb0e-4cee-895b-3b32bd740650';

// NOTE: query returns max of 100. to get next 100 we need to do the following query
// '/api/action/datastore_search?offset=100&resource_id=570a8e02-fb0e-4cee-895b-3b32bd740650'
app.get('/pantries', function(req, res) {
    const limit = req.query.limit || 100; // query will only return 100 results.
    const pageNumber = req.query.pageNumber || 1;

    let uri = `${host}api/action/datastore_search?resource_id=${resourceId}&limit=${limit}`;
    if (pageNumber > 1) {
        const offset = limit * (pageNumber - 1);
        uri = `${host}api/action/datastore_search?offset=${offset}&resource_id=${resourceId}&limit=${limit}`;
    }

    const options = {
        body: {},
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        method: 'GET',
        uri,
    };
    request(options, function(error, response, body) {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        }

        // console.log('body:', body);
        res.send(body.result.records);
    });
});
// NOTE: query returns max of 100. to get next 100 we need to do the following query
// '/api/action/datastore_search?offset=100&resource_id=570a8e02-fb0e-4cee-895b-3b32bd740650'
app.get('/pantries/:zipCode', function(req, res) {
    const limit = req.query.limit || 100;
    const zipCode = req.params.zipCode;
    const pageNumber = req.query.pageNumber || 1;

    let uri = `${host}api/action/datastore_search?resource_id=${resourceId}&limit=${limit}&q=${zipCode}`;
    if (pageNumber > 1) {
        const offset = limit * (pageNumber - 1);
        uri = `${host}api/action/datastore_search?offset=${offset}&resource_id=${resourceId}&limit=${limit}&q=${zipCode}`;
    }

    const options = {
        body: {},
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        method: 'GET',
        uri,
    };
    request(options, function(error, response, body) {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        }
        // console.log('body:', body);
        res.send(body.result.records);
    });
});

app.listen(port);

console.log('Mid Ohio Food Bank RESTful API server started on: ' + port);