#!/bin/sh
export PATH="./node_modules/.bin:$PATH" 
rm -rf node_modules 
npm install
rm -rf coffee-api-challenge
git clone https://github.com/software-shokunin/coffee-api-challenge.git