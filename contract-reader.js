var Fs = require('fs');

function ContractReader(dir) {
	this.dir = dir;
}

ContractReader.prototype.contracts = function() {
	var contracts = [];
	var that = this;
	Fs.readdirSync(this.dir).forEach(function(file) {
    contracts.push(that.fixPath(JSON.parse(Fs.readFileSync(that.dir+'/'+file, 'utf8'))));
  });
  return contracts;
}

ContractReader.prototype.fixPath = function(contract) {
	contract.request.path = contract.request.path.replace('{', ':').replace('}', '');
	return contract;
}

var createContractReader = function(dir) {
	return new ContractReader(dir);
}

exports = module.exports = createContractReader;

