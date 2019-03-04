const RequestUtils = require('../../utils/request');
const QueryUtils = require("../../utils/query");
class AbstractService {
    constructor(tableName) {
        this.tableName = tableName;
        this.requestUtils = RequestUtils.instance();
        this.queryUtils = QueryUtils.instance();
        this.constants = require("../../constants");

        this.config = require("../../../config")[this.constants.getEnv()];
        this.host = this.config.host;
    }
}

module.exports = AbstractService;