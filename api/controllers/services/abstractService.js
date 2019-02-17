class AbstractService {
    constructor(tableName) {
        this.tableName = tableName;
        this.requestUtils = require("../../utils/request");
        this.queryUtils = require("../../utils/query");
        this.constants = require("../../constants");

        this.config = require("../../../config")[this.constants.getEnv()];
        this.host = this.config.host;
    }
}

module.exports = AbstractService;