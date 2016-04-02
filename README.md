[![Build Status](https://snap-ci.com/jeandamore/coffee-api-pact/branch/master/build_image)](https://snap-ci.com/jeandamore/coffee-api-pact/branch/master)

#coffee-api-pact

##Synopsis
A solution to https://github.com/software-shokunin/coffee-api-challenge.
The rule of this solution is that it must be able to fulfil any contract present in the coffee-api-challenge repo while being agnostic of the actual requests and responses for these contracts. A side effect is that any new contract will be automatically fulfilled.

##Public API
http://coffee-api-pact.herokuapp.com


##Development

###Prerequisites
```
	NodeJS
	Ruby 2.2.3 & RubyGems (to run contracts)
	Git
	An Internet Connection
```

###CLI

Bootstrap command
```
	./go.sh
```

Bootstrap without running the Pacto contracts
```
	./go.sh noruby
```

Start the coffee API
```
	./go.sh init
	./go.sh start
```

Stop the coffee API
```
	./go.sh stop
```

Run the unit tests
```
	./go.sh unit
```

Run the Pacto contract tests
```
	./go.sh contracts
```
