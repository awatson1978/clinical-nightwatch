Package.describe({
  summary: "Ultra-easy acceptance testing for your Meteor app with Selenium and Nightwatch.",
  version: "1.1.4",
  git: "https://github.com/awatson1978/clinical-nightwatch"
});


Npm.depends({
    'glob': '3.2.9',
    'lodash': '2.4.1',
    'rimraf': '2.2.8',
    'xml2js': '0.4.2',
    'meteor-stubs': '0.0.2'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');

  api.use(['underscore']);


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
