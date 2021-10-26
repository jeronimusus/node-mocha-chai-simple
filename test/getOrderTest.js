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

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // needed if run from office
chai.use(chaiResponseValidator('/Users/tthjvx/Documents/GitHub/apitesting-mocha-chai-main/yaml/mbaas.yml'));


let response;
describe('TRIPS Verify Booking checks', function() {
  before('Should return HTTP Status 200', async function () {
    order = new GetOrder();
    // This await's for the mw-token async
    response = await order.getResponse();
    console.log(response);

  });
  it('Should return HTTP Status 200', async function () {
    expect(response).to.has.status(200);
  });
});
