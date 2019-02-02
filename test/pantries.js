const config = require('../config');

process.env.NODE_ENV = config.test_env;
process.env.PORT = config.test_port;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const url = '/api/v1/pantries';

const should = chai.should();

chai.use(chaiHttp);

describe('Pantries', () => {
    it('should GET pantries limit 100', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(100);
                done();
            });
    });

    it('should GET pantries with limit of 5', (done) => {
        chai.request(server)
            .get(`${url}?limit=5`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(5);
                done();
            });
    });

    it('should GET pantries by zip code', (done) => {
        chai.request(server)
            .get(`${url}/43228?limit=1`)
            .end((err, res) => {
                res.should.have.status(200);
                const pantry = res.body[0];
                pantry.ZIP.should.be.eql(43228);
                done();
            });
    });
});