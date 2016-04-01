#!/bin/sh

all() 
{
	source ./go-init.sh
	./go-unit.sh
	./go-api.sh start
	./go-contracts.sh
	./go-api.sh stop
}

noruby() 
{
	source ./go-init.sh
	./go-unit.sh
	./go-api.sh start
	./go-api.sh stop
}


if [ $# -eq 1 ] && [ $1 == "noruby" ] ; then
	$1
else
	all
fi