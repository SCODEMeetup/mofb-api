const Location = require("../../models/location");
const AbstractService = require('../abstractService');

class LocationCkanService extends AbstractService {
    constructor() {
        super("agency_location");
        this.agencyLocationResourceId = this.config.agency_location_resource;
        this.serviceLocationResourceId = this.config.service_location_resource;
        this.uri = `${this.host}/api/3/action/datastore_search_sql?sql=`;

        this.queryFields = `
    ${this.tableName}."LOCATION_ID", ${this.tableName}."STREET_1", ${this.tableName}."STREET_2", ${this.tableName}."ZIP", ${this.tableName}."NAME",
    ${this.tableName}."PHONE_AREA_CODE", ${this.tableName}."PHONE_NUMBER", ${this.tableName}."PHONE_EXTENSION", ${this.tableName}."HANDICAP_ACCESS", 
    service_location."HOURS"
`;
        this.query = `
    SELECT ${this.queryFields} FROM "${this.agencyLocationResourceId}" ${this.tableName} 
    INNER JOIN "${this.serviceLocationResourceId}" service_location ON ${this.tableName}."AGENCY_ID" = service_location."AGENCY_ID"
    AND ${this.tableName}."LOCATION_ID" = service_location."LOCATION_ID"
`;

    }

    getAll(req, res) {
        let filter = '';
        let requestBody = '';
        if (req.query.taxonomyId) {
            requestBody = this.queryUtils.joinTables;
            filter = getFilters(filter, `service_taxonomy."TAXON_ID" IN (${req.query.taxonomyId})`);
        }
        if (req.query.agencyId) {
            filter = getFilters(filter, `${this.tableName}."AGENCY_ID" IN (${req.query.agencyId})`);
        }
        requestBody = this.uri + this.query + requestBody;
        const queryString = this.queryUtils.getQueryString(req, requestBody, filter, this.tableName);
        this.requestUtils.getList(queryString, res, Location.getList);
    }

    get(req, res) {
        let requestBody = this.query + this.queryUtils.joinTables;
        const queryString = this.uri + requestBody +
            this.queryUtils.setDefaultFilters(`${this.tableName}."LOCATION_ID" = ${req.params.id} AND service_taxonomy."TAXON_ID" = ${req.params.serviceId}`, this.tableName);
        this.requestUtils.getObject(queryString, res, Location.getObject);
    }
}

function getFilters(existingFilters, addFilter) {
    if (existingFilters) {
        return existingFilters + ` AND ${addFilter}`;
    }
    return addFilter;
}

module.exports = LocationCkanService;