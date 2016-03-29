
'use strict';

var app = require('express')();
var http = require('http').Server(app);
var Pact = require('pact-consumer-js-dsl');
var Fs = require('fs');
var HttpClient = require('./http-client');

var coffeeApi = Pact.mockService({
	consumer: 'coffee-api-challenge',
	provider: 'coffee-api',
	port: 1234,
  done: function(error) {}
});

var httpClient = new HttpClient(
	"http://localhost:1234", 
	{ "Accept": "application/json" }
);

app.get('/menu', function(req, res) {

	var getMenuContract = JSON.parse(Fs.readFileSync('./coffee-api-challenge/contracts/get-menu.json', 'utf8'));

	coffeeApi
  	.given('the service is up and running')
  	.uponReceiving('a request for the menu')
  	.withRequest('get', '/menu', { "Accept": "application/json" })
  	.willRespondWith(
  	  200, 
  	  { "Content-Type": "application/json" }, 
  	  getMenuContract.examples.default.response.body
  	);

  coffeeApi.run(function(){}, function(runComplete) {
     httpClient.get('/menu', function(statusCode, responseObject) {
     	res.send(responseObject);
     	runComplete();
    });
  });

});

http.listen(3000, function() {
  console.log('coffee-api listening on *:3000');
});
