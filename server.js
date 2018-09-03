var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const request = require('request');


app.get('/pantries', function(req, res) {
    const options = {
        // body: {
        //     resource_id: '570a8e02-fb0e-4cee-895b-3b32bd740650', // the resource id
        //     limit: 5, // get 5 results
        //     q: 'jones' // query for 'jones'
        // },
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
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body.result.records);
    });
});

app.get('/pantries/:limit', function(req, res) {
    const options = {
        // body: {
        //     resource_id: '570a8e02-fb0e-4cee-895b-3b32bd740650', // the resource id
        //     limit: 5, // get 5 results
        //     q: 'jones' // query for 'jones'
        // },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        method: 'GET',
        uri: `https://ckan.smartcolumbusos.com/api/action/datastore_search?resource_id=570a8e02-fb0e-4cee-895b-3b32bd740650&limit=${req.params.limit}`,
    };
    request(options, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body.result.records);
    });
});

app.get('/pantries/:zipCode', function(req, res) {
    const options = {
        body: {
            // resource_id: '570a8e02-fb0e-4cee-895b-3b32bd740650', // the resource id
            // limit: 5, // get 5 results
            // q: '43215' // query for 'jones'
        },
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
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body.result.records);
    });
    // res.send({ zipCode: req.params.zipCode, name: "The Name", description: "description" });
});

app.listen(port);

console.log('Mid Ohio Food Bank RESTful API server started on: ' + port);