clinical:nightwatch
===================

**NOTICE:  This package is being deprecated in favor of the StarryNight utility, which resolves most all of the configuration and launching issues that this package had.**    
[starrynight.meteor.com](http://starrynight.meteor.com)

===================
Ultra-easy acceptance testing for your Meteor app with [Selenium](http://www.seleniumhq.org/) and [Nightwatch](http://nightwatchjs.org/).

![Prezi](https://raw.githubusercontent.com/awatson1978/clinical-nightwatch/master/nightwatch.prezi.png)
[View the Prezi on Nightwatch Architecture for Meteor Applications](http://prezi.com/muvofev3r0n0/?utm_campaign=share&utm_medium=copy&rc=ex0share)  

####  Size Warning!
This package is 11mb large, because of the Selenium browser automation server, and will increase the overall size of your application by 11mb!   The good news, however, is that this extra weight won't be shipped down to the client, and is simply bloats the bundle file and adds an unnecessary file to the server.  

####  Table of Contents

- Installation
  - [Meteor](https://www.meteor.com/install)  
  - [Firefox](https://www.mozilla.org/en-US/firefox/new/)  
  - [Java for OSX](http://support.apple.com/kb/DL1572)  
- [Quckstart](https://github.com/awatson1978/clinical-nightwatch#quickstart)
- Acceptance Tests
  - [Writing Your First Acceptance Test](https://github.com/awatson1978/clinical-nightwatch#write-your-first-acceptance-test)  
  - [Writing Acceptance Tests With Nightwatch](https://github.com/awatson1978/meteor-cookbook/blob/master/cookbook/writing.acceptance.test.md)  
- Databases
  - [Resetting the Database](https://github.com/awatson1978/clinical-nightwatch#resetting-the-database-for-new-runs)  
  - [Configuring a Shared Testing Database](https://github.com/awatson1978/clinical-nightwatch#configuring-a-shared-testing-database)  
- [Continous Integration with Travis CI](https://github.com/awatson1978/clinical-nightwatch/blob/master/docs/continuous-integration.md)  
- [Leaderboard Example Using Velocity & Nightwatch-Framework](https://github.com/meteor-velocity/velocity-examples/tree/master/leaderboard-nightwatch)  




####  Quickstart

**Step 1 - Configure the Filesystem**  
Begin by creating the following files in your /tests directory.  For now, the contents of ``global.json`` can be an empty json object `{}`.  

````sh
/tests/nightwatch/globals.json
/tests/nightwatch/logs
/tests/nightwatch/commands
/tests/nightwatch/assertions
/tests/nightwatch/walkthroughs

terminal-a$ chmod -R 777 tests/nightwatch
````

**Step 2 - Add Nightwatch To Your Application**  

Nightwatch works a lot like when you run the ``meteor mongo`` command.  That is, you need to have an instance of meteor running for it work.  More specifically, Nightwatch will attach itself to the compiled version of your app in the ``.meteor/local/build`` directory, and spin up a mirror copy of your app to test with.  Your other app doesn't actually have to be running, but it does need to be run at least once before.

````sh
# go to the root of your application
terminal-a$  cd myappdir
terminal-a$  meteor add clinical:nightwatch

# Go to the root of your application
terminal-a$ cd myappdir

# run the leaderboard application
terminal-a$ meteor
````

**Step 3 - Set up the Launch Script and Run Nightwatch**  

Copy the [run_nightwatch.sh script](https://github.com/awatson1978/clinical-nightwatch/blob/master/run_nightwatch.sample.sh) into your application root.  Once you do that, make sure your permissions are set correctly.

````sh
# In the same way that we run 'meteor mongo' in a separate terminal while our application is already running,
# we want to open up a new terminal, and run nightwatch
terminal-b$ chmod -R 777 .meteor
terminal-b$ chmod 777 run_nightwatch.sh
terminal-b$ ./run_nightwatch.sh

# you might want to do something clever like pass in arguments and run specific tests
terminal-b$ ./run_nightwatch.sh -t tests/nightwatch/leaderboard.js

# of run only the tests that have been tagged with a specific label
terminal-b$ ./run_nightwatch.sh --tag foo
````



#### Write Your First Acceptance Test
Check out this super simple syntax for writing acceptance tests.  All you need to do is copy the following code into a file in the ``/tests`` directory, and Nightwatch will parse it accordingly.

````js
// tests/helloworld.js

module.exports = {
  "Hello World" : function (client) {
    client
      .url("http://127.0.0.1:3000")
      .waitForElementVisible("body", 1000)
      .assert.title("Hello World")
      .end();
  }
};

// tests/google.js
module.exports = {
  tags: ["foo"],
  "Demo Test Google" : function (client) {
    client
      .url("http://www.google.com")
      .waitForElementVisible("body", 1000)
      .assert.title("Google")
      .assert.visible("input[type=text]")
      .setValue("input[type=text]", "nightwatch")
      .waitForElementVisible("button[name=btnG]", 1000)
      .click("button[name=btnG]")
      .pause(1000)
      .assert.containsText("#main", "The Night Watch")
      .end();
  }
};

````




#### Resetting the Database For New Runs
You may notice that your database has gotten out of sync with your tests.  Don't worry, as that's normal.  The easy thing to do is just reset your database.  But you'll eventually need to write your tests so they don't destructively modify your database, or you'll need to create tearUp and tearDown methods, or set up a testing database, or any number of other activities to manage your test data.

````sh
# if you want to rerun the acceptance tests, go back to the first terminal
# and be sure to reset the database
terminal-a$ ctrl-c
terminal-a$ meteor reset
terminal-a$ meteor
````

####  Configuring a Shared Testing Database
With bigger test suites, you'll maybe want to set up an entire test database, in which case you'll want to attach your Nightwatch instance against a test database.  That's probably getting past the extent of this README, but here's a quick reference to how to do that...

````sh
# launch your application against a test database
terminal-a$ MONGO_URL=mongodb://127.0.0.1:27017 PORT=3000 node .meteor/local/build/main.js
````


####  Advanced Topics - Custom Commands, Assertions, and Logs
[Custom Commands](https://groups.google.com/forum/#!searchin/nightwatchjs/client$20execute/nightwatchjs/RC1S2OXILDU/noB39V1oNwMJ)  
[Using Globals.js to Define Test Data](https://groups.google.com/forum/#!searchin/nightwatchjs/upload$20file/nightwatchjs/rYG1Oj-N2II/HP7G8OqQ7ssJ)  
[File Upload Dialog](https://groups.google.com/forum/#!searchin/nightwatchjs/upload$20file/nightwatchjs/tVjjCW5A16o/gz9JYs6RCxoJ)  
[Download File Assertion](https://groups.google.com/forum/#!searchin/nightwatchjs/upload$20file/nightwatchjs/XiP2oTlqtRA/1EqHTH7EXzIJ)  
[Testing Minimongo and Browser Console with execute()](https://groups.google.com/forum/#!searchin/nightwatchjs/run$20command$20line/nightwatchjs/SCwoiVOniWw/wObZ_DcLOUoJ)  
[Code Injection using execute()](https://groups.google.com/forum/#!searchin/nightwatchjs/execute/nightwatchjs/ZdXtwMgliss/O14Duu_cZ7sJ)  
[Connecting to SauceLabs](https://groups.google.com/forum/#!searchin/nightwatchjs/saucelabs/nightwatchjs/EcOkqn9pa8w/slXqfnePTwoJ)



Licensing
------------------------

MIT License. Use as you wish, including for commercial purposes.
