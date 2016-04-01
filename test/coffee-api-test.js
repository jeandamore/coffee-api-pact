'use strict';

var chai = require('chai');
chai.use(require('chai-spies'));
var proxyquire = require('proxyquire')

describe('CoffeeApi', function(done) {

	var coffeeApi;
	var contractReaderStub = {};
	var appStub = {};

	beforeEach(function() {
		coffeeApi = proxyquire(
			'../src/coffee-api',  
			{ 
				'express' : function() { return appStub; },
				'./contract-reader' : function(dir) { return contractReaderStub; } 
			} 
		)(123);
	});

	describe('listen', function() {

		var contractsSpy, getSpy, postSpy;

		beforeEach(function() {
			contractReaderStub.contracts = function() {
				return [ { request: { http_method: 'get', path: '/route1' } }, 
								 { request: { http_method: 'post', path: '/route2' } } ];
			};
			contractsSpy = chai.spy.on(contractReaderStub, 'contracts');
			getSpy = chai.spy.on(appStub, 'get');
			postSpy = chai.spy.on(appStub, 'post');
			coffeeApi.listen();
		});

		it('should get all contracts', function() {
			chai.expect(contractsSpy).to.have.been.called.once();
		});

		it('should create a route for the GET contract', function() {
			chai.expect(getSpy).to.have.been.called.once();
		});

		it('should create a route for the POST contract', function() {
			chai.expect(postSpy).to.have.been.called.once();
		});

	})

	describe('start', function() {

		var server;
		var listenSpy;

		beforeEach(function() {
			contractReaderStub.contracts = function() {
				return [ { request: { http_method: 'get', path: '/route1' } }, 
								 { request: { http_method: 'post', path: '/route2' } } ];
			};
			listenSpy = chai.spy.on(appStub, 'listen');
			coffeeApi.start();
		});

		it('should start the node express listener', function() {
			chai.expect(listenSpy).to.have.been.called.once();
		});

	});

});