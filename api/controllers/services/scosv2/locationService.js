const Location = require("../../models/location")
const AbstractService = require('../abstractService')
const latLong = require('../csv/latLong')
const QueryUtils = require('../../../utils/query')

class LocationService extends AbstractService {

    constructor() {
        super("agency_location")
        this.agencyLocationResourceId = this.config.agency_location_resource
        this.serviceLocationResourceId = this.config.service_location_resource
        this.uri = `${this.host}/api/v1/organization/handson_central_ohio/dataset/location_consolidated/query?_format=json`

        this.queryFields = `
    ${this.tableName}."location_id", ${this.tableName}."location_number", ${this.tableName}."street_1", ${this.tableName}."street_2", ${this.tableName}."zip", ${this.tableName}."name",
    ${this.tableName}."phone_area_code", ${this.tableName}."phone_number", ${this.tableName}."phone_extension", ${this.tableName}."handicap_access",
    service_location."hours"
    `
    }

    getAll(req, res) {
        let filter = ''
        let requestBody = ''
        let query = ''
        if (req.query.taxonomyId) {
            filter = `"taxon_id" = (${req.query.taxonomyId})`
        }

        query = this.uri
        let queryString = this.queryUtils.getQueryString(req, query, filter, this.tableName)

        const agencyIds = `${req.query.agencyId}`
        const uniqueAgencyIds = unique(agencyIds.split(','))
        if (req.query.agencyId) {
            queryString = queryString + `& where "agency_id" = (${uniqueAgencyIds})`
        }
        this.requestUtils.getList(queryString, res, locationWithCoord(Location.get))
    }

    get(req, res) {
        const queryString = this.uri +
                    this.queryUtils.setDefaultFilters(`"location_id" = ${req.params.id} AND "taxon_id" = ${req.params.serviceId}`, this.tableName);
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

/**
 * Remove duplicate array elements
 * @param arr Array with duplicates
 * @return unique array
 */
function unique(arr) {
  const u = {};
  return arr.filter((v) => {
    return u[v] = (v !== undefined && !u.hasOwnProperty(v));
  });
};

module.exports = LocationService;