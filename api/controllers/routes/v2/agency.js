const express = require("express");
const app = express();

function agencyRoutes(service) {
    /**
     * Get Request for all Agencies
     */
    app.get("/", function (req, res) {
        service.getAll(req, res);
    });

    /**
     * Get Request for Agency by ID
     */
    app.get("/:id", function (req, res) {
        service.get(req, res);
    });
    return app;
}

module.exports.agencyRoutes = agencyRoutes;