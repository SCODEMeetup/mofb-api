
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
        let returnUri = `&${tableName}."ACTIVE_FLAG" = 'Y'`;
        if (filterString) {
            returnUri = returnUri + ` &where= ${filterString}`;
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

        return returnUri + ` OFFSET ${offset}&limit=${limit}`;
    }
}

/**
 * SQL Join for service categories to agencies
 */
QueryUtils.joinTables = `
    INNER JOIN "${agencyServiceResourceId}" agency_service ON service_location."AGENCY_ID" = agency_service."AGENCY_ID" 
    AND service_location."LINE_NUMBER" = agency_service."LINE_NUMBER" 
    INNER JOIN "${serviceTaxonomyResourceId}" service_taxonomy ON agency_service."AGENCY_ID" = service_taxonomy."AGENCY_ID" 
    AND agency_service."LINE_NUMBER" = service_taxonomy."LINE_NUMBER"
    `;
module.exports = QueryUtils;