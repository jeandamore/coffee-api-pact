'use strict';

var proxyquire = require('proxyquire')
var chai = require('chai');
chai.use(require('chai-spies'));

describe('CoffeeApi', function(done) {

	var coffeeApi;
	var contractReaderStub = {};
	var appStub = {
		get: function() {},
		post: function() {}
	}

	beforeEach(function() {
		coffeeApi = proxyquire('../src/coffee-api', 
				{ './contract-reader' : function(dir) { return contractReaderStub } }
		)(appStub); 
	});

	describe('initRoutesForContracts', function() {

		var contractsSpy, getSpy, postSpy;

		beforeEach(function() {
			contractReaderStub.contracts = function() {
				return [ 
					{ 
						request: { http_method: 'get', path: '/route1' } 
					}, 
					{
						request: { http_method: 'post', path: '/route2' } 
					} 
				];
			};
			contractsSpy = chai.spy.on(contractReaderStub, 'contracts');
			getSpy = chai.spy.on(appStub, 'get');
			postSpy = chai.spy.on(appStub, 'post');
			coffeeApi.initRoutesForContracts();
		});

		it('should create get all contracts', function() {
			chai.expect(contractsSpy).to.have.been.called.once();
		});

		it('should create a route for the GET contract', function() {
			chai.expect(getSpy).to.have.been.called.once().with('/route1', function() {});
		});

		it('should create a route for the POST contract', function() {
			chai.expect(postSpy).to.have.been.called.once();
		});
	})

});