'use strict';

var app = require('express')();
var contractsReader = require('./contract-reader')('./coffee-api-challenge/contracts');

function CoffeeApi(port) {
  this.port = port;
}

var responseForContract = function(contract) {
  return function(req, res) {
    var body = contract.examples.default.response.body;
    res.set(contract.response.headers);
    res.status(contract.response.status).end((typeof body === 'string') ? body : JSON.stringify(body));
  }
}

var routeForContract = function(contract) {
  app[contract.request.http_method](contract.request.path, responseForContract(contract));
}

var routesForContracts = function() {
  contractsReader.contracts().forEach(routeForContract);
}

CoffeeApi.prototype.listen = function() {
  routesForContracts();
}

CoffeeApi.prototype.start = function() {
  this.server = app.listen(this.port, this.listen);
}

var createCoffeApi = function(port) {
  return new CoffeeApi(port);
}

exports = module.exports = createCoffeApi;
