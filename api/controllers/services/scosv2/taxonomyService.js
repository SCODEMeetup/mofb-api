const Taxonomy = require('../../models/taxonomy');
const AbstractService = require('../abstractService');

class TaxonomyService extends AbstractService {
  constructor() {
    super('taxonomy');
    this.resourceId = this.config.taxonomy_resource;
    this.uri = `${this.host}/api/v1/organization/handson_central_ohio/dataset/${this.resourceId}/query?_format=json`;
  }

  getAll(req, res) {
    const { level } = req.query;
    const levelQuery = `"taxonomy_level" IN (${level})`;
    const queryString = this.queryUtils.getQueryString(
      req,
      this.uri,
      level ? levelQuery : null
    );
    this.requestUtils.getList(queryString, res, Taxonomy.get);
  }

  get(req, res) {
    const queryString =
      this.uri +
      this.queryUtils.setDefaultFilters(`"taxon_id" = ${req.params.id}`);
    console.log(this.requestUtils.getObject);
    this.requestUtils.getObject(queryString, res, Taxonomy.get);
  }

  getAllFoodCategories(_req, res) {
    const queryString =
      this.uri +
      this.queryUtils.setDefaultFilters(
        encodeURIComponent('"taxonomy_code" LIKE \'BD-%\'')
      );
    this.requestUtils.getList(queryString, res, Taxonomy.get);
  }

  getBasicNeeds(_req, res) {
    const queryString =
      this.uri +
      this.queryUtils.setDefaultFilters(
        encodeURIComponent('"taxonomy_code" LIKE \'B%\'')
      );
    this.requestUtils.getList(queryString, res, Taxonomy.get);
  }

  getChildren(req, res) {
    const queryString =
      this.uri +
      this.queryUtils.setDefaultFilters(
        `"taxon_id_subcat_of" IN ('${req.params.id}')`
      );
    this.requestUtils.getList(queryString, res, Taxonomy.get);
  }
}

module.exports = TaxonomyService;
