process.env.NODE_ENV = 'test';
process.env.PORT = 3001;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('Taxonomy', () => {
    it('should GET taxonomies limit 100', (done) => {
        chai.request(server)
            .get('/api/v1/taxonomy')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(100);
                done();
            });
    });

    it('should GET taxonomy with ID 10', (done) => {
        chai.request(server)
            .get('/api/v1/taxonomy/10')
            .end((err, res) => {
                res.should.have.status(200);
                const tax = res.body[0];
                tax.TAXON_ID.should.be.eql('10');
                done();
            });
    });

    it('should GET taxonomy with under basic needs category', (done) => {
        chai.request(server)
            .get('/api/v1/taxonomy/basic-needs')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach(tax => {
                    expect(tax.TAXONOMY_CODE).to.match(/^B.*$/);
                });
                done();
            });
    });
});