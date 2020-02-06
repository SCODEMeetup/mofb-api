const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../../../config');
const server = require('../../../server');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

process.env.PORT = config.test_port;

const url = '/api/v2/agency';

chai.use(chaiHttp);

describe('Agencies V2', () => {
  test('should GET agencies limit 100', done => {
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

  test('should GET agencies with limit of 5', done => {
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

  test('should GET agencies with taxonomy ID of 10', done => {
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

  test('should GET agency with ID of 27600', done => {
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
