#!/bin/sh

./node_modules/.bin/mocha --reporter nyan --compilers js:babel-core/register ./test/**/*-test.js
