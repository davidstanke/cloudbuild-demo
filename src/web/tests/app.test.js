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
});



// describe('app', () =>{
//     it('should return the homepage greeting', () => {
//         var greeting=app.getPageContent('/');
//         expect(greeting).to.contain('Hello');
//     })
// });