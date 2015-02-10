clinical:nightwatch
===================

Ultra-easy acceptance testing for your Meteor app with Selenium and Nightwatch.


####  Requirements

  - Meteor
  - [Firefox 31](https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/31.0/) (Firefox 33+ won't work)  NOTE: recent update to selenium-server-standalone-2.42.0.jar may work with Firefox 33+
  - [Java for OSX](http://support.apple.com/kb/DL1572)  

####  Size Warning!
This package is 11mb large, because of the Selenium browser automation server, and will increase the overall size of your application by 11mb!  The good news, however, is that this extra weight won't be shipped down to the client, and is simply bloats the bundle file and adds an unnecessary file to the server.  We're working on providing this in a way that reduces that overhead as well.


####  Installation
Install Nightwatch and Selenium through Atmosphere or with the Git Clone command.

````sh
# Go to the root of your application
terminal-a$  cd myappdir
terminal-a$  meteor add clinical:nightwatch

````

####  Run Your App For the First Time

Nightwatch works a lot like when you run the ``meteor mongo`` command.  That is, you need to have an instance of meteor running for it work.  More specifically, Nightwatch will attach itself to the compiled version of your app in the ``.meteor/local/build`` directory, and spin up a mirror copy of your app to test with.  Your other app doesn't actually have to be running, but it does need to be run at least once before.

````sh
# Go to the root of your application
terminal-a$ cd myappdir

# run the leaderboard application
terminal-a$ meteor
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
  "Demo test Google" : function (client) {
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




####  Running Tests from App Root
````sh
# In the same way that we run 'meteor mongo' in a separate terminal while our application is already running,
# we want to open up a new terminal, and run nightwatch
terminal-b$ ln -s .meteor/local/build/programs/server/assets/packages/clinical_nightwatch/launch_nightwatch_from_app_root.sh run_nightwatch.sh
terminal-b$ sudo chmod 777 run_nightwatch.sh
terminal-b$ sudo ./run_nightwatch.sh

# you might want to do something clever like pass in arguments and run specific tests
terminal-b$ sudo ./run_nightwatch.sh -t tests/nightwatch/leaderboard.js
````

If the above gives you any trouble, it may be because the ``meteor`` command is downloading the ``clinical:nightwatch`` package each time the app is run, which resets the symlink.  A new behavior from previous versions of meteor.  Try copying the following into ``run_nightwatch.sh``.  

````sh
# run_nightwatch.sh
#echo "changing file permissions"
chmod +x .meteor/local/build/programs/server/assets/packages/clinical_nightwatch/launch_nightwatch*.sh
chmod +x .meteor/local/build/programs/server/assets/packages/clinical_nightwatch/selenium/selenium-server-standalone-2.44.0.jar

#echo "installing nightwatch in .meteor/local/build"
  cd .meteor/local/build
  sudo npm install nightwatch@0.5.3
  cd ../../..

#echo "running nightwatch"
   sudo .meteor/local/build/node_modules/nightwatch/bin/nightwatch -c .meteor/local/build/programs/server/assets/packages/clinical_nightwatch/nightwatch_from_app_root.json $1 $2
````

####  Writing More Complicated Acceptance Tests

Once you have your first test running green, check out the [Nightwatch API](http://nightwatchjs.org/api#assert-attributeEquals), and start creating more advanced tests, like this leaderboard test:
````js
// tests/leaderboard.js
module.exports = {
  "Leaderboard Walkthrough" : function (client) {
    client
      .url("http://localhost:3000")
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('div#outer', 1000)
      .waitForElementVisible('div.leaderboard', 1000)
      .waitForElementVisible('.leaderboard .player', 1000)

      .verify.containsText('div.leaderboard div:nth-child(1) .name', 'Ada Lovelace')
      .verify.containsText('div.leaderboard div:nth-child(1) .score', '50')

      .verify.containsText('div.leaderboard div:nth-child(2) .name', 'Grace Hopper')
      .verify.containsText('div.leaderboard div:nth-child(2) .score', '40')

      .verify.containsText('div.leaderboard div:nth-child(3) .name', 'Claude Shannon')
      .verify.containsText('div.leaderboard div:nth-child(3) .score', '35')

      .verify.containsText('div.leaderboard div:nth-child(4) .name', 'Nikola Tesla')
      .verify.containsText('div.leaderboard div:nth-child(4) .score', '25')

      .verify.containsText('div.leaderboard div:nth-child(5) .name', 'Marie Curie')
      .verify.containsText('div.leaderboard div:nth-child(5) .score', '20')

      .verify.containsText('div.leaderboard div:nth-child(6) .name', 'Carl Friedrich Gauss')
      .verify.containsText('div.leaderboard div:nth-child(6) .score', '5')


      .verify.containsText('.none', 'Click a player to select')
      .click('div.leaderboard div:nth-child(2)')
      .pause(500)
      .waitForElementVisible('input.inc', 1000)
      .verify.attributeEquals('input.inc', 'value', 'Give 5 points')

      .click('input.inc')
      .verify.containsText('div.leaderboard div:nth-child(2) .name', 'Grace Hopper')
      .verify.containsText('div.leaderboard div:nth-child(2) .score', '45')

      .click('input.inc')
      .verify.containsText('div.leaderboard div:nth-child(2) .name', 'Grace Hopper')
      .verify.containsText('div.leaderboard div:nth-child(2) .score', '50')

      .click('input.inc')
      .verify.containsText('div.leaderboard div:nth-child(1) .name', 'Grace Hopper')
      .verify.containsText('div.leaderboard div:nth-child(1) .score', '55')

      .verify.containsText('div.leaderboard div:nth-child(2) .name', 'Ada Lovelace')
      .verify.containsText('div.leaderboard div:nth-child(2) .score', '50')

      .end();
  }
}
````

#### Resetting the Database For New Runs
You may notice that your database has gotten out of sync with your tests.  Don't worry, as that's normal.  The easy thing to do is just reset your database.  But you'll eventually need to write your tests so they don't destructively modify your database, or you'll need to create tearUp and tearDown methods, or set up a testing database, or any number of other activities to manage your test data.

````
# if you want to rerun the acceptance tests, go back to the first terminal
# and be sure to reset the database
terminal-a$ ctrl-c
terminal-a$ meteor reset
terminal-a$ meteor
````

####  Configuring a Shared Testing Database
With bigger test suites, you'll maybe want to set up an entire test database, in which case you'll want to attach your Nightwatch instance against a test database.  That's probably getting past the extent of this README, but here's a quick reference to how to do that...

````
# launch your application against a test database
terminal-a$ MONGO_URL=mongodb://127.0.0.1:27017 PORT=3000 node .meteor/local/build/main.js
````

####  Custom Commands, Assertions, and Logs

There are a few hidden directories to be aware of, which are mapped to core Nightwatch .json configuration file parameters.  Refer to the Nightwatch documentation for more details; but suffice it to say that you write commands, assertions, and logs by accessing the hidden files in ``/tests/nightwatch``.  

````sh
/tests/nightwatch/.commands
/tests/nightwatch/.assertions
/tests/nightwatch/.logs
````

Travis Continuous Integration  
------------------------

Need to run your Nightwatch tests whenever you check in a branch to GitHub or generate a pull-request?  Just add the following script to a ``.travis.yml`` file in the root of your project directory.

````sh
# this travis.yml file is for the leaderboard-nightwatch example, when run standalone
language: node_js

node_js:
  - "0.10"

services:
  - mongodb

cache:
  directories:
    - .meteor/local/build/programs/server/assets/packages
    - .meteor
#    - node_modules
#    - webapp/node_modules

before_install:
  # set up the node_modules dir, so we know where it is
  - "mkdir -p node_modules &"
  # install nightwatch, so we know where it is
  - "npm install nightwatch"
  # fire up xvfb on port :99.0
  - "export DISPLAY=:99.0"
  - "sh -e /etc/init.d/xvfb start"
  # set the xvfb screen size to 1280x1024x16
  - "/sbin/start-stop-daemon --start --quiet --pidfile /tmp/custom_xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -ac -screen 0 1280x1024x16"
  # install meteor
  - "curl https://install.meteor.com | /bin/sh"
  # setup Meteor app
  # - "cd webapp"
  # Optionally we can update all our dependencies here
  #- "meteor update"
  - "meteor reset"
  - "meteor -p 3000 &"
  # give Meteor some time to download packages, init data, and to start
  - "sleep 50"

script: ./run_nightwatch.sh
````

[meteor-travis-ci-nightwatch](https://github.com/zeroasterisk/meteor-travis-ci-nightwatch)  
[velocity-examples](https://github.com/meteor-velocity/velocity-examples)  


Licensing
------------------------

MIT License. Use as you wish, including for commercial purposes.
