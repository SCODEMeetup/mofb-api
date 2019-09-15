const express = require('express');

const app = express();

function taxonomyRoutes(service) {
  /**
   * Get Request for all taxonomy
   */
  app.get('/', function(req, res) {
    service.getAll(req, res);
  });

  /**
   * Get Request for all Food categories
   */
  app.get('/food', function(req, res) {
    service.getAllFoodCategories(req, res);
  });

  /**
   * Get Request for Basic Needs taxonomy
   */
  app.get('/basic-needs', function(req, res) {
    service.getBasicNeeds(req, res);
  });

  /**
   * Get Request for Taxonomy by ID
   */
  app.get('/:id', function(req, res) {
    service.get(req, res);
  });

  /**
   * Get Request for Taxonomy Subcategories by ID
   */
  app.get('/:id/children', function(req, res) {
    service.getChildren(req, res);
  });

  return app;
}

module.exports.taxonomyRoutes = taxonomyRoutes;
