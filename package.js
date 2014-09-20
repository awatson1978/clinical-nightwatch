Package.describe({
  summary: "Ultra-easy acceptance testing for your Meteor app with Selenium and Nightwatch.",
  version: "1.1.3",
  git: "https://github.com/awatson1978/clinical-nightwatch"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');


  api.addFiles('globals.json');
  api.addFiles('launch_nightwatch_from_app_root.sh');
  api.addFiles('launch_nightwatch_from_package.sh');
  api.addFiles('methods.nightwatch.js');
  api.addFiles('nightwatch_from_app_root.json');
  api.addFiles('nightwatch_from_app_root_with_saucelabs.json');
  api.addFiles('nightwatch_from_package.json');

  api.addFiles('commands/seed.txt');
  api.addFiles('logs/seed.txt');
  api.addFiles('tests-output/seed.txt');
  api.addFiles('nightwatch-logs/seed.txt');

  api.addFiles('selenium/chromedriver');
  api.addFiles('selenium/selenium-server-standalone-2.42.0.jar');


});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('clinical:nightwatch-tests.js');
});
