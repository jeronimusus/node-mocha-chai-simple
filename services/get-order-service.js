/*jshint esversion: 8 */
const chai = require('chai'), chaiHttp = require('chai-http');
const yaml = require('js-yaml');
const fs = require('fs');
chai.use(chaiHttp);

class GetOrder {
  constructor() {
    let service = chai.request.agent(`https://order-pizza-api.herokuapp.com`);
    this.service = service;
  }
  async getResponse() {
    this.response = await this.service
      .get("/api/orders")
      .set('Accept', 'application/json')
      ;
    return this.response;
  }
}
module.exports = {GetOrder};
