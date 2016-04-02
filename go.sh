#!/bin/bash

init() {
	export PATH="./node_modules/.bin:$PATH" 
	rm -rf node_modules 
	npm install
	rm -rf coffee-api-challenge
	git clone https://github.com/software-shokunin/coffee-api-challenge.git
}

unit() {	
	./node_modules/.bin/mocha --reporter nyan --compilers js:babel-core/register ./test/**/*-test.js
}

contracts() {
	pushd coffee-api-challenge
	gem install bundler
	echo "gem 'rake'" >> Gemfile
	bundle install
	bundle exec rake "pacto:validate[http://localhost:4567, contracts]" --trace
	popd
}

run() 
{
	init
	./node_modules/.bin/babel-node --presets es2015 src/server.js
}

start() 
{
	./node_modules/.bin/babel-node --presets es2015 src/server.js &
	echo $! > api.pid
}

stop()
{
	if [ -f "api.pid" ]; then
		while read line           
		do    
			pkill -TERM -P $line           
		done < "api.pid"
	fi
	rm -f coffee-api.pid

	echo 'API stopped'
}

all() 
{
	unit
	start
	contracts
	stop
}

noruby() 
{
	unit
	start
	stop
}


if [ $# -eq 0 ]; then
	all
elif ([ $1 == "init" ] \
	|| [ $1 == "all" ] \
	|| [ $1 == "noruby" ] \
	|| [ $1 == "unit" ] \
	|| [ $1 == "contracts" ] \
	|| [ $1 == "run" ] \
	|| [ $1 == "start" ] \
	|| [ $1 == "stop" ]); then
	$1
fi