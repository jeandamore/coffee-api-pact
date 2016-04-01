'use strict';

var chai = require('chai');
var proxyquire = require('proxyquire')
chai.use(require('chai-spies'));

describe('ContractReader', function(done) {

	var contractReader;
	var fsStub = {};

	beforeEach(function() {
		contractReader = proxyquire('../src/contract-reader', { 'fs' : fsStub })('.'); 
	});

	describe('fixPath', function() {

		var fixedContract;

		beforeEach(function() {
			fixedContract = contractReader.fixPath({ request: { path: '{ and }' }});
		});

		it('should replace { by : and } by ', function() {
			chai.expect(fixedContract.request.path).to.equal(': and ');
		});
	})

	describe('contracts', function() {

		var contractStub;
		var readDirSyncSpy, readFileSyncSpy;
		var contracts;

		beforeEach(function() {
			contractStub = "{ "
				+ "\"request\": { \"http_method\": \"options\", \"path\": \"/menu\" }, "
				+ "\"response\": { \"headers\": { \"Content-Type\": \"application/json\" }, \"status\": 200 }, "
				+ "\"examples\": { \"default\": { \"response\": { \"body\": { \"status\": \"READY\" } } } }"
				+ " }";
			fsStub.readdirSync = function() { return ['contract1', 'contract2'] };
			fsStub.readFileSync = function(file) { return contractStub; };
			readDirSyncSpy = chai.spy.on(fsStub, 'readdirSync');
			readFileSyncSpy = chai.spy.on(fsStub, 'readFileSync');
			contracts = contractReader.contracts();
		});

		it('should load all contracts in the directory', function() {
			chai.expect(readDirSyncSpy).to.have.been.called();
		});

		it('should load each contract present in directory', function() {
			chai.expect(readFileSyncSpy).to.have.been.called.exactly(2);
		});

		it('should return the loaded contracts', function() {
			chai.expect(contracts.length).to.equal(2);
		});

		it('should return each loaded contract as an object', function() {
			chai.expect(typeof contracts[0]).to.equal('object');
		});

		it('should return the loaded contracts with the expected request http_method', function() {
			chai.expect(contracts[0].request.http_method).to.equal('options');
		});

		it('should return the loaded contracts with the expected request path', function() {
			chai.expect(contracts[0].request.path).to.equal('/menu');
		});

		it('should return the loaded contracts with the expected response headers', function() {
			chai.expect(contracts[0].response.headers['Content-Type']).to.equal("application/json");
		});

		it('should return the loaded contracts with the expected response status', function() {
			chai.expect(contracts[0].response.status).to.equal(200);
		});

		it('should return the loaded contracts with the expected response body', function() {
			chai.expect(contracts[0].examples.default.response.body.status).to.equal( 'READY' );
		});

	})

});