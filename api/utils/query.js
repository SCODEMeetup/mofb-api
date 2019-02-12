const requestUtils = require("./request");
const constants = require("../constants");
const config = require("../../config")[constants.getEnv()];
const agencyServiceResourceId = config.agency_service_resource;
const serviceTaxonomyResourceId = config.service_taxonomy_resource;
module.exports = {

    /**
     * SQL Join for service categories to agencies
     */
    joinTables: `
        INNER JOIN "${agencyServiceResourceId}" agency_service ON service_location."AGENCY_ID" = agency_service."AGENCY_ID" 
        AND service_location."LINE_NUMBER" = agency_service."LINE_NUMBER" 
        INNER JOIN "${serviceTaxonomyResourceId}" service_taxonomy ON agency_service."AGENCY_ID" = service_taxonomy."AGENCY_ID" 
        AND agency_service."LINE_NUMBER" = service_taxonomy."LINE_NUMBER"
    `,

    /**
     * Set active flag to all queries
     * @param filterString 
     */
    setDefaultFilters: function (filterString, tableName) {
        let returnUri = ` WHERE ${tableName}."ACTIVE_FLAG" = 'Y'`;
        if (filterString) {
            returnUri = returnUri + ` AND ${filterString}`;
        }
        return returnUri;
    },
    /**
     * Sets required parameters (limit, offset, active) and returns SQL statement for query string
     * @param req Request
     * @param uri URI prefix
     * @param filterString any additional filters
     * @param tableName Name of primary table in query
     */
    getQueryString: function (req, uri, filterString, tableName) {
        const {
            offset,
            limit
        } = requestUtils.getPagingParams(req);
        let returnUri = uri + this.setDefaultFilters(filterString, tableName);

        return returnUri + ` OFFSET ${offset} ROWS LIMIT ${limit}`;
    }
}