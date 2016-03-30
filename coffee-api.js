var app = require('express')();
var contractsReader = require('./contract-reader')('./coffee-api-challenge/contracts');

function initRoutesForContracts() {
  contractsReader.contracts().forEach(function(contract) {
    console.log("Will setup route for " + contract.request.http_method + " " + contract.request.path);
    app[contract.request.http_method](contract.request.path, function(req, res) {
      var body = contract.examples.default.response.body;
      res.set(contract.response.headers);
      res.status(contract.response.status).end((typeof body === 'string') ? body : JSON.stringify(body));
    })
  });
}

app.listen(4567, function() {
  initRoutesForContracts();
  console.log('coffee-api listening on *:4567');
});
