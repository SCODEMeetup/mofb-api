process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

let should = chai.should();

chai.use(chaiHttp);

describe('Pantries', () => {
    it('should GET pantries limit 100', (done) => {
        chai.request(server)
        .get('/api/v1/pantries')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(100);
            done();
        });
    });

    it('should GET pantries with limit of 5', (done) => {
        chai.request(server)
        .get('/api/v1/pantries?limit=5')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(5);
            done();
        });
    });

    it('should GET pantries by zip code', (done) => {
        chai.request(server)
        .get('/api/v1/pantries/43228?limit=1')
        .end((err, res) => {
            res.should.have.status(200);
            const pantry = res.body[0];
            pantry.ZIP.should.be.eql(43228);
            done();
        });
    });
});