Package.describe({
  summary: "Ultra-easy acceptance testing with Selenium.",
  version: "1.3.2",
  name: "clinical:nightwatch",
  git: "https://github.com/awatson1978/clinical-nightwatch"
});


Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.2.2');

  api.addFiles('methods.nightwatch.js', ['server']);

  api.addFiles('globals.json', ['server']);
  api.addFiles('launch_nightwatch_from_app_root.sh', ['server']);
  api.addFiles('launch_nightwatch_from_package.sh', ['server']);

  api.addFiles('nightwatch_from_app_root.json', ['server']);
  api.addFiles('nightwatch_from_app_root_with_saucelabs.json', ['server']);
  api.addFiles('nightwatch_from_package.json', ['server']);

  api.addFiles('commands/seed.txt');
  api.addFiles('logs/seed.txt');
  api.addFiles('nightwatch-logs/seed.txt', ['server']);

  api.addFiles('selenium/chromedriver', ['server']);
  api.addFiles('selenium/selenium-server-standalone-2.42.0.jar', ['server']);

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('clinical:nightwatch-tests.js');
});
