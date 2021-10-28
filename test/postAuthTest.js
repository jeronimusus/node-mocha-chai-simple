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
// const env = require('../../services/env-service');

chai.use(chaiResponseValidator('/Users/tthjvx/Documents/GitHub/node-mocha-chai-simple/resources/pizza_swagger.yaml'));

describe('POST acquire access token', function() {
  before('Get the response', async function () {
    auth = new GetAccessToken();
    response = await auth.getResponse();
  });
  it('Should return HTTP Status 200', function () {
    expect(response).to.has.status(200);
  });
  it('Should return an Access Token', function () {
    let token = auth.getAccessToken();
    expect(token, 'Access Token didnot match JWT regex').to.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
  });
  it('Should obey the Swagger', async function () {
    expect(response).to.satisfyApiSpec;
  });
});
