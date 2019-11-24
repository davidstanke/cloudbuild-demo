const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
chai.use(chaiHttp);

describe('server', () => {
    it('should be listening', (done) => {
        chai.request(app)
            .get('/')
            .end((err,res) => {
                expect(res.status).to.equal(200);
                done();
            })
    });

    it('should display the homepage', (done) => {
        chai.request(app)
            .get('/')
            .end((err,res) => {
                expect(res.text).to.contain("Hello");
                done();
            })
    })

    it('should display a personalized greeting', (done) => {
        chai.request(app)
            .post('/greet')
            .type('form')
            .send({'name':'Dave'})
            .end((err,res) => {
                expect(res.text).to.contain("Hello, Dave!");
                done();
            })
    })
});