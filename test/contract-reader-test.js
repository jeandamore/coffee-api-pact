'use strict';

import chai from 'chai';
import spies from 'chai-spies';
import proxyquire from 'proxyquire';

describe('ContractReader', () => {

  let contractReader;
  let fsStub = {};

  beforeEach(() => {
    chai.use(spies);
    let ContractReader = proxyquire('../src/contract-reader', { 'fs' : fsStub });
    contractReader = new ContractReader('.');
  });

  describe('fixPath', () => {

    let fixedContract;

    beforeEach(() => {
      fixedContract = contractReader.fixPath({ request: { path: '{ and }' }});
    });

    it('should replace { by : and } by ', () => {
      chai.expect(fixedContract.request.path).to.equal(': and ');
    });
  })

  describe('contracts', () => {

    let contractStub;
    let readDirSyncSpy, readFileSyncSpy;
    let contracts;

    beforeEach(() => {
      contractStub = "{ "
        + "\"request\": { \"http_method\": \"options\", \"path\": \"/menu\" }, "
        + "\"response\": { \"headers\": { \"Content-Type\": \"application/json\" }, \"status\": 200 }, "
        + "\"examples\": { \"default\": { \"response\": { \"body\": { \"status\": \"READY\" } } } }"
        + " }";
      fsStub.readdirSync = () => { return ['contract1', 'contract2'] };
      fsStub.readFileSync = (file) => { return contractStub; };
      readDirSyncSpy = chai.spy.on(fsStub, 'readdirSync');
      readFileSyncSpy = chai.spy.on(fsStub, 'readFileSync');
      contracts = contractReader.contracts();
    });

    it('should load all contracts in the directory', () => {
      chai.expect(readDirSyncSpy).to.have.been.called();
    });

    it('should load each contract present in directory', () => {
      chai.expect(readFileSyncSpy).to.have.been.called.exactly(2);
    });

    it('should return the loaded contracts', () => {
      chai.expect(contracts.length).to.equal(2);
    });

    it('should return each loaded contract as an object', () => {
      chai.expect(typeof contracts[0]).to.equal('object');
    });

    it('should return the loaded contracts with the expected request http_method', () => {
      chai.expect(contracts[0].request.http_method).to.equal('options');
    });

    it('should return the loaded contracts with the expected request path', () => {
      chai.expect(contracts[0].request.path).to.equal('/menu');
    });

    it('should return the loaded contracts with the expected response headers', () => {
      chai.expect(contracts[0].response.headers['Content-Type']).to.equal("application/json");
    });

    it('should return the loaded contracts with the expected response status', () => {
      chai.expect(contracts[0].response.status).to.equal(200);
    });

    it('should return the loaded contracts with the expected response body', () => {
      chai.expect(contracts[0].examples.default.response.body.status).to.equal( 'READY' );
    });

  })

});