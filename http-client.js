var http = require('http');
var request = require('request');

function HttpClient(url, headers) {
	
    this.options = {
  			url: url,
  			headers: headers
		};
}
	
HttpClient.prototype.get = function(resource, callback) {

		var resourceOptions = {
			url: this.options.url+resource,
			headers: this.options.headers
		};

		request(resourceOptions, function (error, response, jsonResponse) {
    	if (error) return callback(response.statusCode, error);
    	callback(response.statusCode, JSON.parse(jsonResponse));
    });

}

exports = module.exports = HttpClient;