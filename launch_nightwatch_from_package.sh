#!/bin//bash
#this script doesn't support $1 and $2 arguments
#so it can only be used to run complete suites
#if you want to run a single test file, run from app-root

echo "installing nightwatch in .meteor/local/build"
  cd ../../../../..
  sudo npm install nightwatch@0.5.3

echo "running nightwatch"
   sudo node_modules/nightwatch/bin/nightwatch -c programs/server/assets/packages/clinical_nightwatch/nightwatch_from_package.json
