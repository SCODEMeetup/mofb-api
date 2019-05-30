
const constants = require("../constants");
const config = require("../../config")[constants.getEnv()];
const RequestUtils = require("./request");

const agencyServiceResourceId = config.agency_service_resource;
const serviceTaxonomyResourceId = config.service_taxonomy_resource;

class QueryUtils {
    static instance() {
        if(!this.INSTANCE) {
            this.INSTANCE = new QueryUtils();
            this.INSTANCE.requestUtils = RequestUtils.instance();
        }
        return this.INSTANCE;
    }

    setRequestUtils(requestUtils) {
        this.requestUtils = requestUtils;
    }


    /**
     * Set active flag to all queries
     * @param filterString 
     */
    setDefaultFilters(filterString, tableName) {
        let returnUri = `&where=active_flag ='Y'`;
        if (filterString) {
            returnUri = returnUri + ` AND ${filterString}`;
        }
        return returnUri;
    }

    /**
     * Sets required parameters (limit, offset, active) and returns SQL statement for query string
     * @param req Request
     * @param uri URI prefix
     * @param filterString any additional filters
     * @param tableName Name of primary table in query
     */
    getQueryString(req, uri, filterString, tableName) {
        const {
            offset,
            limit
        } = this.requestUtils.getPagingParams(req);
        let returnUri = uri + this.setDefaultFilters(filterString, tableName);

        return returnUri + `&limit=${limit}`;
    }
}

/**
 * SQL Join for service categories to agencies
 */
QueryUtils.joinTables = `
    INNER JOIN "${agencyServiceResourceId}" agency_service ON service_location."agency_id" = agency_service."agency_id"
    AND service_location."line_number" = agency_service."line_number"
    INNER JOIN "${serviceTaxonomyResourceId}" service_taxonomy ON agency_service."agency_id" = service_taxonomy."agency_id"
    AND agency_service."line_number" = service_taxonomy."line_number"
    `;
module.exports = QueryUtils;