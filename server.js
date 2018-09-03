var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const request = require('request');


app.get('/pantries', function(req, res) {
    const options = {
        body: {},
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        method: 'GET',
        uri: 'https://ckan.smartcolumbusos.com/api/action/datastore_search?resource_id=570a8e02-fb0e-4cee-895b-3b32bd740650&limit=100',
    };
    request(options, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        res.send(body.result.records);
    });
});

app.get('/pantries/:zipCode', function(req, res) {
    const options = {
        body: {},
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        method: 'GET',
        uri: `https://ckan.smartcolumbusos.com/api/action/datastore_search?resource_id=570a8e02-fb0e-4cee-895b-3b32bd740650&limit=100&q=${req.params.zipCode}`,
    };
    request(options, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        res.send(body.result.records);
    });
});

app.listen(port);

console.log('Mid Ohio Food Bank RESTful API server started on: ' + port);