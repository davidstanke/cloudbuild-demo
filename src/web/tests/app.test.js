const chai = require('chai');
// const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

describe('app', () =>{
    it('should return the homepage greeting', () => {
        var greeting=app.getPageContent('/');
        expect(greeting).to.contain('Hello');
    })
});