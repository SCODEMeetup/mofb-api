const config = require('../config');

process.env.NODE_ENV = config.test_env;
process.env.PORT = config.test_port;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Agencies', () => {
    it('should GET agencies limit 100', (done) => {
        chai.request(server)
            .get('/api/v1/agency')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(100);
                done();
            });
    });

    it('should GET agencies with limit of 5', (done) => {
        chai.request(server)
            .get('/api/v1/agency?limit=5')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(5);
                done();
            });
    });

    it('should GET agencies with taxonomy ID of 10', (done) => {
        chai.request(server)
            .get('/api/v1/agency?taxonomyId=10')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach(agency => {
                    agency.TAXON_ID.should.eq('10');
                });
                done();
            });
    });

    it('should GET agency with ID of 27600', (done) => {
        chai.request(server)
            .get('/api/v1/agency/27600')
            .end((err, res) => {
                res.should.have.status(200);
                res.body[0].AGENCY_ID.should.eq('27600');
                done();
            });
    });
});