const constants = require('../constants');
const config = require('../../config')[constants.getEnv()];
const RequestUtils = require('./request');

const agencyServiceResourceId = config.agency_service_resource;
const serviceTaxonomyResourceId = config.service_taxonomy_resource;

class QueryUtils {
  static instance() {
    if (!this.INSTANCE) {
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
  setDefaultFilters(filterString) {
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
  getQueryString(req, uri, filterString) {
    const { offset, limit } = this.requestUtils.getPagingParams(req);
    let returnUri = uri + this.setDefaultFilters(filterString);

    return returnUri + ` &limit=${limit}`;
  }
}

module.exports = QueryUtils;
