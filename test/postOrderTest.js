/*jshint esversion: 8 */
/*jshint -W030 */
const chai = require('chai');
const expect  = require('chai').expect;
const yaml = require('js-yaml');
const fs   = require('fs');
var _ = require('lodash');
const ObjectsToCsv = require('objects-to-csv');

const chaiResponseValidator = require('chai-openapi-response-validator');
const {GetAccessToken} = require('../services/auth-service');
const {PostOrder} = require('../services/post-order-service');
const {DeleteOrder} = require('../services/delete-order-service');
// const env = require('../../services/env-service');

chai.use(chaiResponseValidator('/Users/tthjvx/Documents/GitHub/node-mocha-chai-simple/resources/pizza_swagger.yaml'));

describe('POST an Order', function() {
  describe('Create the Order', function() {
    before('Get the response', async function () {
      auth = new GetAccessToken();
      authResponse = await auth.getResponse();
      postedOrder = new PostOrder();
      response = await postedOrder.getResponse(
        auth.getAccessBearerToken(),
        "Crusty Crust",
        "Flavoursome flavour",
        "Sizeabel size",
        99
      );
    });
    it('Should return HTTP Status 201', function () {
      expect(response).to.has.status(201);
    });
    it('Should have the correct order in the payload', function() {
      expect(response.body.Crust).to.have.string('Crusty Crust');
      expect(response.body.Flavor).to.have.string('Flavoursome flavour');
      expect(response.body.Size).to.have.string('Sizeabel size');
      expect(response.body.Table_No).to.equal(99);
    });
    it('Should return an Order ID in the payload', function () {
      expect(response.body.Order_ID).to.be.a('number');
    });
    it('Should return a Timestamp in the payload', function () {
        expect(response.body.Timestamp).to.match(/^[1-9]\d{3}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}$/);
    });
    it('Should obey the Swagger', async function () {
      expect(response).to.satisfyApiSpec;
    });
  });
  describe('Delete the created Order', function() {
    before('Get the response', async function () {
      deletedOrder = new DeleteOrder();
      response = await deletedOrder.getResponse(postedOrder.getOrderId());
    });
    it('Should return HTTP Status 200', function () {
      expect(response).to.has.status(200);
    });
    it('Should get a Order Deleted message', function () {
      expect(response.body.message).to.have.string('Order deleted');
    });
    it('Should obey the Swagger', async function () {
      expect(response).to.satisfyApiSpec;
    });
  });
});
