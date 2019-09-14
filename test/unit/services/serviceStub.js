const sinon = require('sinon');

class ServiceStub {
  constructor(service) {
    this.getListStub = sinon.stub(service.requestUtils, 'getList');
    this.getObjectStub = sinon.stub(service.requestUtils, 'getObject');
    this.getQueryStringStub = sinon
      .stub(service.queryUtils, 'getQueryString')
      .returns('stub string');
    this.setDefaultFiltersStub = sinon
      .stub(service.queryUtils, 'setDefaultFilters')
      .returns('stub filters');
  }

  reset() {
    this.getListStub.resetHistory();
    this.getObjectStub.resetHistory();
    this.getQueryStringStub.resetHistory();
    this.setDefaultFiltersStub.resetHistory();
  }
}

module.exports = ServiceStub;
