[![Build Status](https://snap-ci.com/jeandamore/coffee-api-pact/branch/master/build_image)](https://snap-ci.com/jeandamore/coffee-api-pact/branch/master)

#coffee-api-pact

##Synopsys
A solution to https://github.com/software-shokunin/coffee-api-challenge.
The design principle of this solution is to be able to fulfil any contract (existing or new) from the coffee-api-challenge repo.

##Services
GET http://coffee-api-pact.herokuapp.com/menu
GET http://coffee-api-pact.herokuapp.com/order/{orderId}
POST http://coffee-api-pact.herokuapp.com/order/{orderId}

##Prerequisites
```
	NodeJS
	Ruby 2.2.3 & RubyGems (to run contracts)
	Git
	An Internet Connection
```

##CLI

###Bootstrap command
```
	./go.sh
```

###Bootstrap without running the Ruby/Pact contracts
```
	./go.sh noruby
```

###Start the coffee API
```
	./go.sh init
	./go.sh start
```

###Stop the coffee API
```
	./go.sh stop
```

###Run the unit tests
```
	./go.sh unit
```

###Run the Ruby/Pact contract tests
```
	./go.sh contracts
```
