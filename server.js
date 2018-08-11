var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.get('/pantries', function(req, res) {
    res.send([{name:'panty1'}, {name:'pantry2'}]);
});
app.get('/pantries/:zipCode', function(req, res) {
    res.send({zipCode:req.params.zipCode, name: "The Name", description: "description"});
});

app.listen(port);

console.log('Mid Ohio Food Bank RESTful API server started on: ' + port);