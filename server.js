var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const pantryRouter = require('./api/controllers/routes/pantries');
const taxonomyRouter = require('./api/controllers/routes/taxonomy');
const agencyRouter = require('./api/controllers/routes/agency');

app.use('/api/v1/pantries', pantryRouter);
app.use('/api/v1/taxonomy', taxonomyRouter);
app.use('/api/v1/agency', agencyRouter);

app.listen(port);

console.log('Mid Ohio Food Bank RESTful API server started on: ' + port);

module.exports = app;