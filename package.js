Package.describe({
  summary: "Ultra-easy acceptance testing with Selenium.",
  version: "1.2.21",
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
  api.use(['livedata']);
  api.use(['velocity:core@0.2.8']);


  api.addFiles('globals.json', ['server']);
  api.addFiles('launch_nightwatch_from_app_root.sh', ['server']);
  api.addFiles('launch_nightwatch_from_package.sh', ['server']);
  api.addFiles('methods.nightwatch.js', ['server']);
  api.addFiles('nightwatch_from_app_root.json', ['server']);
  api.addFiles('nightwatch_from_app_root_with_saucelabs.json', ['server']);
  api.addFiles('nightwatch_from_package.json', ['server']);

  api.addFiles('commands/seed.txt');
  api.addFiles('logs/seed.txt');
  api.addFiles('nightwatch-logs/seed.txt', ['server']);

  api.addFiles('selenium/chromedriver', ['server']);
  api.addFiles('selenium/selenium-server-standalone-2.42.0.jar', ['server']);

  api.addFiles('velocity.integration.js', ['server']);

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('clinical:nightwatch-tests.js');
});
