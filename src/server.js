'use strict';

var app = require('express')();
var coffeeApi = require('./coffee-api')(app);

app.listen(4567, function() {
  coffeeApi.initRoutesForContracts();
  console.log('coffee-api listening on *:4567');
});
