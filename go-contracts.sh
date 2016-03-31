#!/bin/sh

pushd coffee-api-challenge
gem install rake
gem install bundler
bundle install
rake "pacto:validate[http://localhost:4567, contracts]" --trace
popd