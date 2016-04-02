#!/bin/bash

pushd coffee-api-challenge
gem install bundler
echo "gem 'rake'" >> Gemfile
bundle install
bundle exec rake "pacto:validate[http://localhost:4567, contracts]" --trace
popd