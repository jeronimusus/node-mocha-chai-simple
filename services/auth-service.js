/*jshint esversion: 8 */
const chai = require('chai'), chaiHttp = require('chai-http');
const yaml = require('js-yaml');
const fs = require('fs');
chai.use(chaiHttp);

class GetAccessToken {
  constructor() {
    let service = chai.request.agent(`https://order-pizza-api.herokuapp.com`);
    this.service = service;
  }
  async getResponse() {
    let data = JSON.stringify({
      password: 'test',
      username: 'test'
    });
    this.response = await this.service
      .post("/api/auth")
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(data)
      ;
    return this.response;
  }
  getAccessToken() {
    let token = this.response.body.access_token;
    return token;
  }
}
module.exports = {GetAccessToken};
