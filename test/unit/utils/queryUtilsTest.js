const config = require('../../../config');
process.env.NODE_ENV = config.test_env;
const QueryUtils = require('../../../api/utils/query');
const RequestUtils = require('../../../api/utils/request');

const expect = require('chai').expect;
const sinon = require('sinon');

describe('Query Utils', () => {
    const queryUtils = new QueryUtils();
    const requestUtilStub = sinon.createStubInstance(RequestUtils)
    requestUtilStub.getPagingParams.returns({ offset: 0, limit: 10 });
    queryUtils.setRequestUtils(requestUtilStub);

    it('should set default filters no filter string', () => {
        const query = queryUtils.setDefaultFilters(null, 'test table');
        expect(query).to.equal(' WHERE test table."ACTIVE_FLAG" = \'Y\'');
    });

    it('should set default filters with filter string', () => {
        const query = queryUtils.setDefaultFilters('filters', 'test table');
        expect(query).to.equal(' WHERE test table."ACTIVE_FLAG" = \'Y\' AND filters');
    });

    it('should set query string', () => {
        const query = queryUtils.getQueryString(null, 'testUri', 'testFilterString', 'testTableName')
        expect(query).to.equal('testUri WHERE testTableName."ACTIVE_FLAG" = \'Y\' AND testFilterString OFFSET 0 ROWS LIMIT 10');
    });
})