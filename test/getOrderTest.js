/*jshint esversion: 8 */
/*jshint -W030 */
const chai = require('chai');
const expect  = require('chai').expect;
const yaml = require('js-yaml');
const fs   = require('fs');
var _ = require('lodash');
const ObjectsToCsv = require('objects-to-csv');

const chaiResponseValidator = require('chai-openapi-response-validator');
const {GetOrder} = require('../services/get-order-service');
// const env = require('../../services/env-service');

chai.use(chaiResponseValidator('/Users/tthjvx/Documents/GitHub/node-mocha-chai-simple/resources/pizza_swagger.yaml'));

let response;
describe('GET all the pizza orders', function() {
  before('Get the response', async function () {
    order = new GetOrder();
    response = await order.getResponse();
  });
  it('Should return HTTP Status 200', function () {
    expect(response).to.has.status(200);
  });
  it('Should obey the Swagger', async function () {
    expect(response).to.satisfyApiSpec;
  });
});
