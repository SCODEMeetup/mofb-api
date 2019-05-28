const Taxonomy = require("../../models/taxonomy");
const AbstractService = require('../abstractService');

class TaxonomyCkanService extends AbstractService {
    constructor() {
        super("taxonomy");
        this.resourceId = this.config.taxonomy_resource;
        this.uri = `${this.host}/api/v1/organization/handson_central_ohio/dataset/${this.resourceId}/query?_format=json`;

    }

    getAll(req, res) {
        const level = req.query.level;
        const levelQuery = `"TAXONOMY_LEVEL" IN (${level})`;
        const queryString = this.queryUtils.getQueryString(req, this.uri, level ? levelQuery : null, this.tableName);
        this.requestUtils.getList(queryString, res, Taxonomy.get);
    }

    get(req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters(`"TAXON_ID" = ${req.params.id}`, this.tableName);
        this.requestUtils.getObject(queryString, res, Taxonomy.get);
    }

    getAllFoodCategories(_req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters('"TAXONOMY_CODE" LIKE N\'BD-%\'', this.tableName);
        this.requestUtils.getList(queryString, res, Taxonomy.get);
    }

    getBasicNeeds(_req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters('"TAXONOMY_CODE" LIKE N\'B%\'', this.tableName);
        this.requestUtils.getList(queryString, res, Taxonomy.get);
    }

    getChildren(req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters(`"TAXON_ID_SUBCAT_OF" IN (${req.params.id})`, this.tableName);
        this.requestUtils.getList(queryString, res, Taxonomy.get);
    }
}

module.exports = TaxonomyCkanService;