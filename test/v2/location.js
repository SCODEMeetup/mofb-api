const config = require('../../config');
const server = require('../../server');

process.env.NODE_ENV = config.test_env;
process.env.PORT = config.test_port;

const chai = require('chai');
const chaiHttp = require('chai-http');
const url = '/api/v2/location';

const should = chai.should();

chai.use(chaiHttp);

describe('Locations V2', () => {
    it('should GET locations limit 100', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(100);
                done();
            });
    });

    it('should GET locations with limit of 5', (done) => {
        chai.request(server)
            .get(`${url}?limit=5`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(5);
                done();
            });
    });

    it('should GET locations with taxonomy ID of 10', (done) => {
        chai.request(server)
            .get(`${url}?taxonomyId=10`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('should GET locations with agency ID of 10', (done) => {
        chai.request(server)
            .get(`${url}?agencyId=10`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach(location => {
                    location.agencyId.should.eq('10');
                });
                done();
            });
    });

    it('should GET location with ID of 7300 and service category 10', (done) => {
        chai.request(server)
            .get(`${url}/7300/service/10`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.id.should.eq('7300');
                done();
            });
    });
});