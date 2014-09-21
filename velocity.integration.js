(function () {

  "use strict";

  var pwd = process.env.PWD,
      DEBUG = process.env.NIGHTWATCH_DEBUG,
      child_process = Npm.require('child_process'),
      spawn = child_process.spawn,
      parseString = Npm.require('xml2js').parseString,
      glob = Npm.require('glob'),
      fs = Npm.require('fs'),
      path = Npm.require('path'),
      rimraf = Npm.require('rimraf'),
      sys = Npm.require('sys'),
      //testReportsPath = path.join(pwd, 'tests', '.reports', 'jasmine-unit'),
      //testReportsPath = path.join(pwd, 'tests', '.reports', 'nightwatch-acceptance'),
      testReportsPath = parsePath(pwd + '/tests/.reports/nightwatch-acceptance'),
      args = [],
      consoleData = '',
      nightwatchCli,
      closeFunc,
      rerunTests,
      RUN_TEST_THROTTLE_TIME = 100;


  var SystemWrapper = {
    standardOut: function(error, stdout, stderr) {
      var sys = Npm.require('sys');
      sys.puts(stdout);
    }
  };


  //nightwatchCli = parsePath(pwd + '/packages/selenium-nightwatch/launch_nightwatch_from_velocity.sh');

  //child_process.exec(nightwatchCli, SystemWrapper.standardOut);

  console.log("Starting Nightwatch...");

  if (Velocity && Velocity.registerTestingFramework){
    console.log("Registering Nightwatch with Velocity...");
    Velocity.registerTestingFramework("nightwatch", {regex: /nightwatch/});
    //Velocity.parseXmlFiles("nightwatch");

    //Meteor.call('registerTestFramework', "nightwatch");

    console.log("Parsing Nightwatch XML report files...");
    parseXmlFiles("nightwatch");

  }

  //////////////////////////////////////////////////////////////////////
  // Methods

      function parseXmlFiles (selectedFramework){
         //var closeFunc = Meteor.bindEnvironment(function () {
           console.log('binding environment and parsing Nightwatch FIREFOX xml files...')

           var newResults = [];
           //var globSearchString = parsePath('**/FIREFOX*.xml');
           var globSearchString = path.join('**', 'FIREFOX_*.xml');
           var xmlFiles = glob.sync(globSearchString, { cwd: testReportsPath });

           //console.log('globSearchString', globSearchString);
           //console.log('xmlFiles', xmlFiles);

           _.each(xmlFiles, function (xmlFile, index) {
             parseString(fs.readFileSync(testReportsPath + path.sep + xmlFile), function (err, result) {
               _.each(result.testsuites.testsuite, function (testsuite) {
                 _.each(testsuite.testcase, function (testcase) {
                   var result = {
                     name: testcase.$.name,
                     framework: selectedFramework,
                     result: testcase.failure ? 'failed' : 'passed',
                     timestamp: new Date(),
                     time: moment().format("HH:MM:SS"),
                     ancestors: ["nightwatch"]
                   };

                   if (testcase.failure) {
                     testcase.failure.forEach(function (failure) {
                       result.failureType = failure.$.type;
                       result.failureMessage = failure.$.message;
                       result.failureStackTrace = failure._;
                     });
                   }
                   result.id = selectedFramework + ':' + hashCode(xmlFile + testcase.$.classname + testcase.$.name);
                   newResults.push(result.id);
                   //console.log('result', result);
                   Meteor.call('postResult', result);
                 });
               });
             });

             if (index === xmlFiles.length - 1) {
               Meteor.call('resetReports', {framework: selectedFramework, notIn: newResults});
               Meteor.call('completed', {framework: selectedFramework});
             }
           });
         //});
      }


  //////////////////////////////////////////////////////////////////////
  // private functions

  function hashCode (s) {
    return s.split("").reduce(function (a, b) {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
  }

  function parsePath (unixPath) {
    return unixPath.replace('\/', path.sep);
  }



})();
