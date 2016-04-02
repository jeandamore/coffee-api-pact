'use strict';

import chai from 'chai';
import spies from 'chai-spies';
import proxyquire from 'proxyquire';

describe('Api', () => {

  let api;
  let contractReaderStub = {};
  let appStub = {};

  beforeEach(() => {
    chai.use(spies);
    let Api = proxyquire(
      '../src/api',  
      { 
        'express' : function() { return appStub; },
        './contract-reader' : function(dir) { return contractReaderStub; } 
      } 
    )
    api = new Api(123);
  });

  describe('routes', () => {

    let contractsSpy, getSpy, postSpy;

    beforeEach(() => {
      contractReaderStub.contracts = function() {
        return [ { request: { http_method: 'get', path: '/route1' } }, 
                 { request: { http_method: 'post', path: '/route2' } } ];
      };
      contractsSpy = chai.spy.on(contractReaderStub, 'contracts');
      getSpy = chai.spy.on(appStub, 'get');
      postSpy = chai.spy.on(appStub, 'post');
      api.routes();
    });

    it('should get all contracts', () => {
      chai.expect(contractsSpy).to.have.been.called.once();
    });

    it('should create two GET routes: one for the root path and one for /route1', () => {
      chai.expect(getSpy).to.have.been.called.twice();
    });

    it('should create one PIST route for /route2', () => {
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
      api.start();
    });

    it('should start the node express listener', () => {
      chai.expect(listenSpy).to.have.been.called.once();
    });

  });

});