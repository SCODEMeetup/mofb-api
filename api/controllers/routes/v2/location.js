const express = require("express");
const app = express();

function locationRoutes(service) {
    /**
     * Get Request for locations
     */
    app.get("/", function (req, res) {
        service.getAll(req, res);
    });


    /**
     * Get Request for single location by location ID and service ID
     */
    app.get("/:id/service/:serviceId", function (req, res) {
        service.get(req, res);
    });

    return app;
}

module.exports.locationRoutes = locationRoutes;