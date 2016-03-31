#!/bin/sh

usage() 
{
	echo "Usage: api [start|stop]"
}

start() 
{
	echo 'Starting Coffee coffee-api...'
	node src/server.js &
	echo $! > coffee-api.pid
	echo '...Coffee API started'
}

stop()
{
	echo 'Stopping Coffee coffee-api...'

	if [ -f "coffee-api.pid" ]; then
		while read line           
		do           
    		kill -9 $line           
		done < "coffee-api.pid"
	fi
	rm -f coffee-api.pid

	echo '...Coffee API stopped'
}


if [ $# -eq 0 ] || ([ $1 != "start" ] && [ $1 != "stop" ]); then
	usage
else
	$1
fi
