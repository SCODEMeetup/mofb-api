const Location = require("../../models/location");
const AbstractService = require('../abstractService');
const latLong = require('../csv/latLong');
const QueryUtils = require('../../../utils/query');

class LocationCkanService extends AbstractService {
    constructor() {
        super("agency_location");
        this.agencyLocationResourceId = this.config.agency_location_resource;
        this.serviceLocationResourceId = this.config.service_location_resource;
        this.uri = `${this.host}/api/v1/organization/handson_central_ohio/dataset/`;

        this.queryFields = `
    ${this.tableName}."location_id", ${this.tableName}."location_number", ${this.tableName}."street_1", ${this.tableName}."street_2", ${this.tableName}."zip", ${this.tableName}."name",
    ${this.tableName}."phone_area_code", ${this.tableName}."phone_number", ${this.tableName}."phone_extension", ${this.tableName}."handicap_access",
    service_location."hours"
    `;
        this.query = `
    SELECT ${this.queryFields} FROM "${this.agencyLocationResourceId}" ${this.tableName} 
    INNER JOIN "${this.serviceLocationResourceId}" service_location ON ${this.tableName}."agency_id" = service_location."agency_id"
    AND ${this.tableName}."location_id" = service_location."location_id"
    `;

    }

    getAll(req, res) {
        let filter = '';
        let requestBody = '';
        /*if (req.query.taxonomyId) {
            requestBody = QueryUtils.joinTables;
            filter = getFilters(filter, `service_taxonomy."taxon_id" IN (${req.query.taxonomyId})`);
        }
        if (req.query.agencyId) {
            filter = getFilters(filter, `${this.tableName}."agency_id" IN (${req.query.agencyId})`);
        }*/
        //requestBody = this.uri + this.query + requestBody;
        const queryString = this.uri + `${this.serviceLocationResourceId}`+'/query?_format=json'+ this.queryUtils.setDefaultFilters('columns = location_id, location_number, street_1, street_2, zip, name, phone_area_code, phone_number, phone_extension, handicap_access')
        console.log(this.requestUtils.getList(queryString, res, locationWithCoord(Location.get)));
    }

    get(req, res) {
        const queryString = this.uri + this.queryUtils.setDefaultFilters('and columns = location_id, location_number, street_1, street_2, zip, name, phone_area_code, phone_number, phone_extension, handicap_access')
        this.requestUtils.getObject(queryString, res, locationWithCoord(Location.get));
    }
}

function getFilters(existingFilters, addFilter) {
    if (existingFilters) {
        return existingFilters + ` AND ${addFilter}`;
    }
    return addFilter;
}

function locationWithCoord(mapper) {
    return body => {
        body.forEach(b => {
            latLong.getLatLong(b.location_id, b.location_number, (err, res) => {
                if(res) {
                    b.lat = res.lat;
                    b.long = res.long;
                }
            });
        });
        return mapper(body);
    }
}

module.exports = LocationCkanService;