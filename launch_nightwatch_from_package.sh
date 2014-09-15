#!/bin//bash

# .meteor/local/build/programs/server/assets/packages/awatson1978_selenium-nightwatch/selenium/
# .meteor/local/build/programs/server/assets/packages/awatson1978_selenium-nightwatch/selenium/launch_nightwatch_from_package.sh
# programs/server/assets/packages/awatson1978_selenium-nightwatch/selenium/


echo "installing nightwatch in .meteor/local/build"
  cd ../../../../..
  sudo npm install nightwatch@0.5.3

echo "running nightwatch"
   sudo node_modules/nightwatch/bin/nightwatch -c programs/server/assets/packages/awatson1978_selenium-nightwatch/nightwatch_from_package.json $1 $2
