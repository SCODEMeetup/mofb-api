const config = require('../../../../config');
process.env.NODE_ENV = config.test_env;

const expect = require('chai').expect;

const AgencyService = require('../../../../api/controllers/services/scosv2/agencyService');
const Agency = require('../../../../api/controllers/models/agency');
const service = new AgencyService();
const ServiceStub = require('../serviceStub');
const stubs = new ServiceStub(service);

const res = {};

beforeEach(() => {
  stubs.reset();
});

describe('Agency Service', () => {
  it('should create', () => {
    expect(service.tableName).to.equal('agency');
    expect(service.agencyServiceResourceId).to.equal(
      'testAgencyServiceResource'
    );
    expect(service.serviceTaxonomyResourceId).to.equal(
      'testServiceTaxonomyResource'
    );
    expect(service.agencyResourceId).to.equal('testAgencyResource');
    expect(service.uri).to.equal(
      'testHost/api/v1/organization/handson_central_ohio/dataset/agency_consolidated/query?_format=json'
    );
  });

  it('should get all with no params', () => {
    const req = {
      query: {},
    };
    service.getAll(req, res);
    expect(stubs.getQueryStringStub.args).to.eql(
      [[req, service.uri, null]],
      'getQueryString args'
    );
    expect(stubs.getListStub.args).to.eql([['stub string', res, Agency.get]]);
  });

  it('should get all with taxonomyId params', () => {
    const req = {
      query: {
        taxonomyId: '1',
      },
    };
    service.getAll(req, res);
    expect(stubs.getQueryStringStub.args).to.eql(
      [[req, service.uri, `"taxon_id" = (1)`]],
      'getQueryString args'
    );
    expect(stubs.getListStub.args).to.eql([['stub string', res, Agency.get]]);
  });

  it('should get single by ID', () => {
    const req = {
      params: {
        id: '1',
      },
    };
    service.get(req, res);
    expect(stubs.setDefaultFiltersStub.args).to.eql(
      [[`"agency_id" = 1`]],
      'getQueryString args'
    );
    expect(stubs.getObjectStub.args).to.eql([
      [service.uri + 'stub filters', res, Agency.get],
    ]);
  });
});
