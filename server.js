const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(require('./api/routes.js').getRoutes('v2', 'scosv2'));

app.listen(port);

console.log(`Mid Ohio Food Bank RESTful API server started on: ${port}`);

module.exports = app;
