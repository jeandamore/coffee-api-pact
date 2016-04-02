'use strict';

import App from 'express';
import ContractReader from './contract-reader';

class Api {

  constructor(port) {
    this.contractReader = new ContractReader('./coffee-api-challenge/contracts');
    this.port = port;
    this.app = App();
    this.urls  = '';
    this.response = (contract) => this._response(contract);
    this.routes = () => this._routes();
    this.start = () => this._start();
    this.info = () => this._info();
  }

  _info() {
    let that = this;
    this.app.get('/', function(req, res) { 
      res.status(200).end(that.urls);
    });
  }

  _response(contract) {
    return function(req, res) {
      let body = contract.examples.default.response.body;
      res.set(contract.response.headers);
      res.status(contract.response.status).end((typeof body === 'string') ? body : JSON.stringify(body));
    }
  }

  _routes() {
    let that = this;
    this.contractReader.contracts().forEach(function(contract) {
      that.app[contract.request.http_method](contract.request.path, that.response(contract));
      that.urls = that.urls + contract.request.http_method.toUpperCase() + ' ' + contract.request.path + '\n';
    });
    this.info();
  }

  _start() {
    console.log("API listening on port " + this.port);
    this.app.listen(this.port, this.routes);
  }

}

module.exports = Api;
