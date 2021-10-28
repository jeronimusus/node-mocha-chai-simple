/*jshint esversion: 8 */
/*jshint -W030 */
const chai = require('chai');
const expect  = require('chai').expect;
const yaml = require('js-yaml');
const fs   = require('fs');
var _ = require('lodash');
const ObjectsToCsv = require('objects-to-csv');

const chaiResponseValidator = require('chai-openapi-response-validator');
const {DeleteOrder} = require('../services/delete-order-service');
const {GetAccessToken} = require('../services/auth-service');
const {PostOrder} = require('../services/post-order-service');
// const env = require('../../services/env-service');

chai.use(chaiResponseValidator('/Users/tthjvx/Documents/GitHub/node-mocha-chai-simple/resources/pizza_swagger.yaml'));

describe('DELETE a pizza orders', function() {
  describe('Create Order to Delete', function() {
    before('Gets the Create Order response', async function () {
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
    it('Should obey the Swagger', async function () {
      expect(response).to.satisfyApiSpec;
    });
  });
  describe('Delete created Order', function() {
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
