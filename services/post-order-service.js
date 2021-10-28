/*jshint esversion: 8 */
const chai = require('chai'), chaiHttp = require('chai-http');
const yaml = require('js-yaml');
const fs = require('fs');
chai.use(chaiHttp);

class PostOrder {
  constructor() {
    let service = chai.request.agent(`https://order-pizza-api.herokuapp.com`);
    this.service = service;
  }
  async getResponse(accessToken, crust, flavor, size, tableNo) {
    let data = JSON.stringify({
      Crust: crust,
      Flavor: flavor,
      Size: size,
      Table_No: tableNo
    });
    this.response = await this.service
      .post("/api/orders")
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken)
      .send(data)
      ;
    return this.response;
  }
  getOrderId() {
    let token = this.response.body.Order_ID;
    return token;
  }
}
module.exports = {PostOrder};
