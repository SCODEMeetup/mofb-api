var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors')

app.use(cors())
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const taxonomyRouterV1 = require('./api/controllers/routes/v1/taxonomy');
const agencyRouterV1 = require('./api/controllers/routes/v1/agency');
const locationRouterV1 = require('./api/controllers/routes/v1/location');

app.use('/api/v1/taxonomy', taxonomyRouterV1);
app.use('/api/v1/agency', agencyRouterV1);
app.use('/api/v1/location', locationRouterV1);

app.use(require('./api/routes.js').getRoutes('v2', 'ckan'));



app.listen(port)

console.log('Mid Ohio Food Bank RESTful API server started on: ' + port)

module.exports = app