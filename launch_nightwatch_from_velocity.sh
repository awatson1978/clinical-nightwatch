#!/bin//bash
# run this file from your application's root directory

echo "changing file permissions"
chmod +x ./assets/packages/clinical_nightwatch/launch_nightwatch*.sh
chmod +x ./assets/packages/clinical_nightwatch/selenium/selenium-server-standalone-2.42.0.jar

echo "installing nightwatch in .meteor/local/build"
cd ../..
sudo npm install nightwatch@0.5.35

echo "running nightwatch"
sudo ./node_modules/nightwatch/bin/nightwatch -c ./programs/server/assets/packages/clinical_nightwatch/nightwatch_from_velocity.json $1 $2
