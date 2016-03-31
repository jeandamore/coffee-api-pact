'use strict';

var contractsReader = require('./contract-reader')('./coffee-api-challenge/contracts');

function CoffeeApi(app) {
  this.app = app;
}

CoffeeApi.prototype.initRoutesForContracts = function() {
  var that = this;
  contractsReader.contracts().forEach(function(contract) {
    that.app[contract.request.http_method](contract.request.path, function(req, res) {
      var body = contract.examples.default.response.body;
      res.set(contract.response.headers);
      res.status(contract.response.status).end((typeof body === 'string') ? body : JSON.stringify(body));
    })
  });
}

var createCoffeeApi = function(app) {
  return new CoffeeApi(app);
}

exports = module.exports = createCoffeeApi;
