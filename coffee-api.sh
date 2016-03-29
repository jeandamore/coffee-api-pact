#!/bin/sh

usage() 
{
	echo "Usage coffee-api [start|stop]"
}

setup() {
	echo $NODE_ENV

	CURRENT_DIR=$(pwd)
	SCRIPT_DIR=$(dirname $0)

	if [ $SCRIPT_DIR = '.' ]; then
	SCRIPT_DIR="$CURRENT_DIR"
	fi
}

download() {
	if [ ! -d $1 ]; then
		echo "Will download https://github.com/bethesque/pact-mock_service/releases/download/v0.7.2/$1.tar.gz"
	  curl -LO https://github.com/bethesque/pact-mock_service/releases/download/v0.7.2/$1.tar.gz
		tar xzf $1.tar.gz
		rm -f $1.tar.gz
	fi
}

start() 
{
	echo 'Downloading Pact Mock Service...'

	if [ "$NODE_ENV" == "test" ]; then
		download pact-mock-service-0.7.2-1-linux-x86_64
		pushd pact-mock-service-0.7.2-1-linux-x86_64/bin
	else
		download pact-mock-service-0.7.2-1-osx
		pushd pact-mock-service-0.7.2-1-osx/bin
	fi
	echo 'Pact Mock Service Downloaded'

	echo "Starting Coffee API in $(pwd) for $(uname -a)..."
	./pact-mock-service -p 1234 --pact-specification-version 2.0.0 -l $SCRIPT_DIR/pacts/pacts.log --pact-dir $SCRIPT_DIR/pacts &
	echo $! > $SCRIPT_DIR/pact-mock-service.pid
	echo 'Coffee API Started'

	popd

}


stop()
{
	echo 'Stopping the Coffee API...'

	if [ -f "$SCRIPT_DIR/pact-mock-service.pid" ]; then
		while read line           
		do           
    		kill -9 $line           
		done < "$SCRIPT_DIR/pact-mock-service.pid"
	fi
	rm -f $SCRIPT_DIR/pact-mock-service.pid

	echo 'Coffee API Stopped'
}


if [ $# -eq 0 ] || ([ $1 != "start" ] && [ $1 != "stop" ]); then
	usage
else
	setup
	$1
fi
