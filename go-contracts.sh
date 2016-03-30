#!/bin/sh

pushd coffee-api-challenge
gem install bundler
bundle install
bundle exec rake "pacto:validate[http://localhost:4567, contracts]" --trace
popd