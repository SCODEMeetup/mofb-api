const requestUtils = require("./request");

module.exports = {
    getQueryString: function (req, uri) {
        const {
            offset,
            limit
        } = requestUtils.getPagingParams(req);
        return uri + ` OFFSET ${offset} ROWS LIMIT ${limit}`;
    }
}