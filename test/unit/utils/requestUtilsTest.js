const { expect } = require('chai');
const sinon = require('sinon');
const Cache = require('../../../cache');
const RequestUtils = require('../../../api/utils/request');

describe('Request Utils', () => {
  const cacheStub = sinon.createStubInstance(Cache);
  cacheStub.TTL_SECS_DEFAULT = 600;
  const utils = new RequestUtils();
  utils.setCache(cacheStub);

  const res = {
    status: () => res,
    send: () => null,
  };

  const responseStub = sinon.stub(res, 'send');
  const requestStub = sinon.stub(utils, 'handleRequest');

  beforeEach(() => {
    responseStub.resetHistory();
    requestStub.resetHistory();
    cacheStub.set.resetHistory();
  });

  it('should get paging params default', () => {
    const paging = utils.getPagingParams({ query: {} });
    expect(paging).to.eql({ offset: 0, limit: 500 });
  });

  it('should get paging params with input', () => {
    const paging = utils.getPagingParams({
      query: { limit: 10, pageNumber: 2 },
    });
    expect(paging).to.eql({ offset: 10, limit: 10 });
  });

  it('should return list cached value', () => {
    cacheStub.get.returns('cached value');
    utils.getList('test', res, null);
    expect(responseStub.args).to.eql([['cached value']]);
  });

  it('should return list non-cached value', () => {
    cacheStub.get.returns(undefined);
    utils.getList('test', res, null);
    const args = requestStub.args[0];
    expect(args[0]).to.equal('test');
    expect(args[1]).to.equal(res);
  });

  it('should return object cached value', () => {
    cacheStub.get.returns('cached value');
    utils.getObject('test', res, null);
    expect(responseStub.args).to.eql([['cached value']]);
  });

  it('should return object non-cached value', () => {
    cacheStub.get.returns(undefined);
    utils.getObject('test', res, null);
    const args = requestStub.args[0];
    expect(args[0]).to.equal('test');
    expect(args[1]).to.equal(res);
  });

  it('should handle list responses', () => {
    const listHandler = utils.handleListResponse('testUri', res, body => [
      'test',
    ]);
    listHandler({ result: { records: {} } });
    expect(cacheStub.set.args).to.eql([['testUri', ['test'], 600]]);
    expect(responseStub.args).to.eql([[['test']]]);
  });

  it('should handle object responses', () => {
    const objectHandler = utils.handleObjectResponse('testUri', res, body => [
      'test',
    ]);
    objectHandler(['test']);
    expect(cacheStub.set.args).to.eql([['testUri', 'test', 600]]);
    expect(responseStub.args).to.eql([['test']]);
  });

  it('should handle object responses no response', () => {
    const objectHandler = utils.handleObjectResponse('testUri', res, body => [
      'test',
    ]);
    objectHandler([]);
    // eslint-disable-next-line no-unused-expressions
    expect(cacheStub.set.notCalled).to.be.true;
    expect(responseStub.args).to.eql([['No results for query']]);
  });
});
