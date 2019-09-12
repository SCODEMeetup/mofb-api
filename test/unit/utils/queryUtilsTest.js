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
        const query = queryUtils.setDefaultFilters(null);
        expect(query).to.equal('&where=active_flag =\'Y\'');
    });

    it('should set default filters with filter string', () => {
        const query = queryUtils.setDefaultFilters('filters');
        expect(query).to.equal('&where=active_flag =\'Y\' AND filters');
    });

    it('should set query string', () => {
        const query = queryUtils.getQueryString(null, 'testUri', 'testFilterString')
        expect(query).to.equal('testUri&where=active_flag =\'Y\' AND testFilterString &limit=10');
    });
})