const Agency = require("../../models/agency");
const AbstractService = require('../abstractService');

class AgencyService extends AbstractService {
    constructor() {
        super("agency");
        this.agencyServiceResourceId = this.config.agency_service_resource;
        this.serviceTaxonomyResourceId = this.config.service_taxonomy_resource;
        this.agencyResourceId = this.config.agency_resource;
        this.uri = `${this.host}/api/3/action/datastore_search_sql?sql=SELECT * FROM "${this.agencyResourceId}" ${this.tableName} `;
        this.joinQuery = `
        INNER JOIN "${this.agencyServiceResourceId}" agency_service ON agency."AGENCY_ID" = agency_service."AGENCY_ID" 
        INNER JOIN "${this.serviceTaxonomyResourceId}" service_taxonomy ON agency_service."AGENCY_ID" = service_taxonomy."AGENCY_ID" 
        AND agency_service."LINE_NUMBER" = service_taxonomy."LINE_NUMBER"
    `;

    }

    getAll(req, res) {
        let query = '';
        let filter = null;
        if (req.query.taxonomyId) {
            query = this.joinQuery;
            filter = `service_taxonomy."TAXON_ID" IN (${req.query.taxonomyId})`;
        }
        query = this.uri + query;
        const queryString = this.queryUtils.getQueryString(req, query, filter, this.tableName);
        this.requestUtils.getList(queryString, res, Agency.get);
    }

    get(req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters(`agency."AGENCY_ID" = ${req.params.id}`, this.tableName);
        this.requestUtils.getObject(queryString, res, Agency.get);
    }
}

module.exports = AgencyService;