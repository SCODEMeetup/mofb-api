const Agency = require("../../models/agency");
const AbstractService = require('../abstractService');

class AgencyService extends AbstractService {
    constructor() {
        super("agency");
        this.agencyServiceResourceId = this.config.agency_service_resource;
        this.serviceTaxonomyResourceId = this.config.service_taxonomy_resource;
        this.agencyResourceId = this.config.agency_resource;
        this.uri = `${this.host}/api/v1/organization/handson_central_ohio/dataset/${this.agencyResourceId}/query?_format=json`;
        this.joinQuery = `
        &where= INNER JOIN "${this.agencyServiceResourceId}" agency_service ON agency."agency_id" = agency_service."agency_id"
        INNER JOIN "${this.serviceTaxonomyResourceId}" service_taxonomy ON agency_service."agency_id" = service_taxonomy."agency_id"
        AND agency_service."line_number" = service_taxonomy."line_number"
    `;

    }

    getAll(req, res) {
        let query = '';
        let filter = null;
        if (req.query.taxonomyId) {
            query = this.joinQuery;
            filter = `service_taxonomy."taxon_id" IN (${req.query.taxonomyId})`;
        }
        query = this.uri + query;
        const queryString = this.queryUtils.getQueryString(req, query, filter, this.tableName);
        this.requestUtils.getList(queryString, res, Agency.get);
    }

    get(req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters(`"agency_id" = ${req.params.id}`, this.tableName);
        this.requestUtils.getObject(queryString, res, Agency.get);
    }
}

module.exports = AgencyService;