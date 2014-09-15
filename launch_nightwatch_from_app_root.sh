#!/bin//bash
echo "installing nightwatch in .meteor/local/build"
  cd .meteor/local/build
  sudo npm install nightwatch@0.5.3

echo "running nightwatch"
  sudo node_modules/nightwatch/bin/nightwatch -c programs/server/assets/packages/awatson1978_selenium-nightwatch
