const express = require("express");
const app = express();

function getRoutes(version, path) {
    const agencyRouter = require(`./controllers/routes/${version}/agency`);
    const AgencyService = require(`./controllers/services/${path}/agencyService`);
    app.use(`/api/${version}/agency`, agencyRouter.agencyRoutes(new AgencyService()));

    const taxonomyRouter = require(`./controllers/routes/${version}/taxonomy`);
    const TaxonomyService = require(`./controllers/services/${path}/taxonomyService`);
    app.use(`/api/${version}/taxonomy`, taxonomyRouter.taxonomyRoutes(new TaxonomyService));

    const locationRouter = require(`./controllers/routes/${version}/location`);
    const LocationService = require(`./controllers/services/${path}/locationService`);
    app.use(`/api/${version}/location`, locationRouter.locationRoutes(new LocationService()));

    return app;
}

module.exports.getRoutes = getRoutes;