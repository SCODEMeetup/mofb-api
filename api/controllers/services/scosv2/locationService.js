const Location = require("../../models/location")
const AbstractService = require('../abstractService')
const latLong = require('../csv/latLong')
const lodash = require("lodash")

class LocationService extends AbstractService {

    constructor() {
        super("agency_location")
        this.agencyLocationResourceId = this.config.agency_location_resource
        this.serviceLocationResourceId = this.config.service_location_resource
        this.uri = `${this.host}/api/v1/organization/handson_central_ohio/dataset/location_consolidated/query?_format=json`
    }

    getAll(req, res) {
        let filter = ''
        let query = ''
        if (req.query.taxonomyId) {
            filter = `"taxon_id" = (${req.query.taxonomyId})`
        }

        if (req.query.agencyId) {
            const agencyIds = `${req.query.agencyId}`
            const uniqueAgencyIdsArr = lodash.uniq(agencyIds.split(','))
            filter = filter + " AND "
            uniqueAgencyIdsArr.forEach((value, key, arr) => {
                filter = filter + "agency_id  = " + value
                if(!Object.is (arr.length - 1, key)){
                    filter = filter + " OR "
                }
            })
         }

        query = this.uri
        let queryString = this.queryUtils.getQueryString(req, query, filter, this.tableName)

        console.log(queryString)
        this.requestUtils.getList(queryString, res, locationWithCoord(Location.get))
    }

    get(req, res) {
        const queryString = this.uri +
                    this.queryUtils.setDefaultFilters(`"location_id" = ${req.params.id} AND "taxon_id" = ${req.params.serviceId}`, this.tableName);
        this.requestUtils.getObject(queryString, res, locationWithCoord(Location.get));
    }
}

function locationWithCoord(mapper) {
    return body => {
        body.forEach(b => {
            latLong.getLatLong(b.location_id, b.location_number, (_err, res) => {
                if(res) {
                    b.lat = res.lat
                    b.long = res.long
                }
            })
        })
        return mapper(body)
    }
}

module.exports = LocationService