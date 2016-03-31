[![Build Status](https://snap-ci.com/jeandamore/coffee-api-pact/branch/master/build_image)](https://snap-ci.com/jeandamore/coffee-api-pact/branch/master)

# coffee-api-pact
A solution to https://github.com/software-shokunin/coffee-api-challenge

##Prerequisites
```
	NodeJS
	Ruby 2.2.3 & RubyGems (to run contracts)
	Git
	An Internet Connection
```

###To run everything:
```
	./go.sh
```

###To run everything but the contracts (no need for Ruby):
```
	./go.sh noruby
```

###To start the coffee API:
```
	./go-init.sh
	./go-api.sh start
```

###To stop the coffee API:
```
	./go-api.sh stop
```

###To run the unit tests:
```
	./go-unit.sh
```

###To run the contract tests:
```
	./go-contracts.sh
```
