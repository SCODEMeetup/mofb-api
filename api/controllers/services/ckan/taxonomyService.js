const Taxonomy = require("../../models/taxonomy");
const AbstractService = require('../abstractService');

class TaxonomyCkanService extends AbstractService {
    constructor() {
        super("taxonomy");
        this.resourceId = this.config.taxonomy_resource;
        this.uri = `${this.host}/api/3/action/datastore_search_sql?sql=SELECT * FROM "${this.resourceId}" ${this.tableName} `;

    }

    getAll(req, res) {
        const level = req.query.level;
        const levelQuery = `"TAXONOMY_LEVEL" = ${level}`;
        const queryString = this.queryUtils.getQueryString(req, this.uri, level ? levelQuery : null, this.tableName);
        this.requestUtils.getList(queryString, res, Taxonomy.getList);
    }

    get(req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters(`"TAXON_ID" = ${req.params.id}`, this.tableName);
        this.requestUtils.getObject(queryString, res, Taxonomy.getObject);
    }

    getAllFoodCategories(_req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters('"TAXONOMY_CODE" LIKE N\'BD-%\'', this.tableName);
        this.requestUtils.getList(queryString, res, Taxonomy.getList);
    }

    getBasicNeeds(_req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters('"TAXONOMY_CODE" LIKE N\'B%\'', this.tableName);
        this.requestUtils.getList(queryString, res, Taxonomy.getList);
    }

    getChildren(req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters(`"TAXON_ID_SUBCAT_OF" = ${req.params.id}`, this.tableName);
        this.requestUtils.getList(queryString, res, Taxonomy.getList);
    }
}

module.exports = TaxonomyCkanService;