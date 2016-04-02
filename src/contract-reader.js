'use strict';

import Fs from 'fs';

class ContractReader {

	constructor(dir) {
		this.dir = dir;
		this.contracts = () => this._contracts();
		this.fixPath = (contract) => this._fixPath(contract);
	}

	_contracts() {
		let contracts = [];
		let that = this;
		Fs.readdirSync(this.dir).forEach((file) => {
			contracts.push(that.fixPath(JSON.parse(Fs.readFileSync(that.dir+'/'+file, 'utf8'))));
		});
		return contracts;
	}
	
	_fixPath(contract) {
		contract.request.path = contract.request.path.replace('{', ':').replace('}', '');
		return contract;
	}

}

module.exports = ContractReader;

