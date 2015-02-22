Package.describe({
  summary: "Ultra-easy acceptance testing with Selenium.",
  version: "1.6.0",
  name: "clinical:nightwatch",
  git: "https://github.com/awatson1978/clinical-nightwatch",
  debugOnly: true
});

Npm.depends({
  'nightwatch': '0.5.36'
});


Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.addFiles('globals.json', ['server']);
  api.addFiles('launch_nightwatch_from_app_root.sh', ['server']);
  api.addFiles('launch_nightwatch_from_package.sh', ['server']);

  api.addFiles('nightwatch_from_app_root.json', ['server']);
  api.addFiles('nightwatch_from_app_root_with_saucelabs.json', ['server']);
  api.addFiles('nightwatch_from_package.json', ['server']);
  api.addFiles('nightwatch_from_velocity.json', ['server']);

  api.addFiles('selenium/chromedriver', ['server']);
  api.addFiles('selenium/selenium-server-standalone-2.44.0.jar', ['server']);

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('clinical:nightwatch-tests.js');
});
