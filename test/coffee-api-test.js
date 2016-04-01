'use strict';

import chai from 'chai';
import spies from 'chai-spies';
import proxyquire from 'proxyquire';

describe('CoffeeApi', () => {

	let coffeeApi;
	let contractReaderStub = {};
	let appStub = {};

	beforeEach(() => {
		chai.use(spies);
		let CoffeeApi = proxyquire(
			'../src/coffee-api',  
			{ 
				'express' : function() { return appStub; },
				'./contract-reader' : function(dir) { return contractReaderStub; } 
			} 
		)
		coffeeApi = new CoffeeApi(123);
	});

	describe('listen', () => {

		let contractsSpy, getSpy, postSpy;

		beforeEach(() => {
			contractReaderStub.contracts = function() {
				return [ { request: { http_method: 'get', path: '/route1' } }, 
								 { request: { http_method: 'post', path: '/route2' } } ];
			};
			contractsSpy = chai.spy.on(contractReaderStub, 'contracts');
			getSpy = chai.spy.on(appStub, 'get');
			postSpy = chai.spy.on(appStub, 'post');
			coffeeApi.listen();
		});

		it('should get all contracts', () => {
			chai.expect(contractsSpy).to.have.been.called.once();
		});

		it('should create a route for the GET contract', () => {
			chai.expect(getSpy).to.have.been.called.once();
		});

		it('should create a route for the POST contract', () => {
			chai.expect(postSpy).to.have.been.called.once();
		});

	})

	describe('start', () => {

		let server;
		let listenSpy;

		beforeEach(() => {
			contractReaderStub.contracts = () => {
				return [ { request: { http_method: 'get', path: '/route1' } }, 
								 { request: { http_method: 'post', path: '/route2' } } ];
			};
			listenSpy = chai.spy.on(appStub, 'listen');
			coffeeApi.start();
		});

		it('should start the node express listener', () => {
			chai.expect(listenSpy).to.have.been.called.once();
		});

	});

});