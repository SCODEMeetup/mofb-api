const RequestUtils = require('../../utils/request');
const QueryUtils = require('../../utils/query');
const constants = require('../../constants');
const config = require('../../../config');

class AbstractService {
  constructor(tableName) {
    this.tableName = tableName;
    this.requestUtils = RequestUtils.instance();
    this.queryUtils = QueryUtils.instance();
    this.constants = constants;

    this.config = config[this.constants.getEnv()];
    this.host = this.config.host;
  }
}

module.exports = AbstractService;
