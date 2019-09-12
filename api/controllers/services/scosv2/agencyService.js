const Agency = require("../../models/agency")
const AbstractService = require('../abstractService')

class AgencyService extends AbstractService {
    constructor() {
        super("agency")
        this.agencyServiceResourceId = this.config.agency_service_resource
        this.serviceTaxonomyResourceId = this.config.service_taxonomy_resource
        this.agencyResourceId = this.config.agency_resource
        this.uri = `${this.host}/api/v1/organization/handson_central_ohio/dataset/agency_consolidated/query?_format=json`
    }

    getAll(req, res) {
        let query = ''
        let filter = null
        if (req.query.taxonomyId) {
            filter = `"taxon_id" = (${req.query.taxonomyId})`
        }
        query = this.uri
        const queryString = this.queryUtils.getQueryString(req, query, filter)
        this.requestUtils.getList(queryString, res, Agency.get)

    }

    get(req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters(`"agency_id" = ${req.params.id}`)
        this.requestUtils.getObject(queryString, res, Agency.get)
    }
}

module.exports = AgencyService