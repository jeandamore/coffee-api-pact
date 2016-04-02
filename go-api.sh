#!/bin/sh

usage() 
{
	echo "Usage: api [start|stop]"
}

start() 
{
	echo 'Starting API...'
	babel-node --presets es2015 src/server.js &
	echo $! > api.pid
	echo '...API started'
}

stop()
{
	echo 'Stopping API...'

	if [ -f "api.pid" ]; then
		while read line           
		do    
			pkill -TERM -P $line           
		done < "api.pid"
	fi
	rm -f coffee-api.pid

	echo '...API stopped'
}


if [ $# -eq 0 ] || ([ $1 != "start" ] && [ $1 != "stop" ]); then
	usage
else
	$1
fi
