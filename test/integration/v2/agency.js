const config = require('../../../config');
process.env.PORT = config.test_port;

const server = require('../../../server');

const chai = require('chai');
const should = chai.should();

const chaiHttp = require('chai-http');
const url = '/api/v2/agency';

chai.use(chaiHttp);

describe('Agencies V2', () => {
  it('should GET agencies limit 100', done => {
    chai
      .request(server)
      .get(url)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(100);
        done();
      });
  });

  it('should GET agencies with limit of 5', done => {
    chai
      .request(server)
      .get(`${url}?limit=5`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(5);
        done();
      });
  });

  it('should GET agencies with taxonomy ID of 10', done => {
    chai
      .request(server)
      .get(`${url}?taxonomyId=10`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.forEach(agency => {
          agency.taxonomyId.should.eq('10');
        });
        done();
      });
  });

  it('should GET agency with ID of 27600', done => {
    chai
      .request(server)
      .get(`${url}/27600`)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.body.id.should.eq('27600');
        done();
      });
  });
});
