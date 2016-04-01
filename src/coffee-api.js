'use strict';

import App from 'express';
import ContractReader from './contract-reader';

class CoffeeApi {

  constructor(port) {
    this.contractReader = new ContractReader('./coffee-api-challenge/contracts');
    this.port = port;
    this.app = App();
    this.response = (contract) => this._response(contract);
    this.listen = () => this._listen();
    this.start = () => this._start();
  }

  _response(contract) {
    return function(req, res) {
      let body = contract.examples.default.response.body;
      res.set(contract.response.headers);
      res.status(contract.response.status).end((typeof body === 'string') ? body : JSON.stringify(body));
    }
  }

  _listen() {
    let that = this;
    this.contractReader.contracts().forEach(function(contract) {
      that.app[contract.request.http_method](contract.request.path, that.response(contract));
    });
  }

  _start() {
    this.app.listen(this.port, this.listen);
  }

}

module.exports = CoffeeApi;
