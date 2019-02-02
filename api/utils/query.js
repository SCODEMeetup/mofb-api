const requestUtils = require("./request");

module.exports = {
    /**
     * Set active flag to all queries
     * @param filterString 
     */
    setDefaultFilters: function(filterString, tableName) {
        let returnUri = ` WHERE ${tableName}."ACTIVE_FLAG" = 'Y'`;
        if(filterString) {
            returnUri = returnUri +  ` AND ${filterString}`;
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