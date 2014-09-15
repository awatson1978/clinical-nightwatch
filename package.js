Package.describe({
  summary: "Dead-easy acceptance testing for your Meteor app with Selenium and Nightwatch.",
  version: "1.0.1",
  git: "https://github.com/awatson1978/selenium-nightwatch"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('awatson1978:selenium-nightwatch.js');

api.addFiles('globals.js');
api.addFiles('launch_nightwatch_from_app_root.js');
api.addFiles('launch_nightwatch_from_package.js');
api.addFiles('methods.nightwatch.js');
api.addFiles('nightwatch_from_app_root.json');
api.addFiles('nightwatch_from_app_root_with_saucelabs.js');
api.addFiles('nightwatch_from_package.json');

api.addFiles('commands/seed.txt');
api.addFiles('logs/seed.txt');
api.addFiles('tests-output/seed.txt');

api.addFiles('selenium/chromedriver');
api.addFiles('selenium/selenium-server-standalone-2.42.0.js');


});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('awatson1978:selenium-nightwatch');
  api.addFiles('awatson1978:selenium-nightwatch-tests.js');
});
