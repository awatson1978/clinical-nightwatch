selenium-nightwatch
===================

Dead-easy acceptance testing for your Meteor app with Selenium and Nightwatch.


####  Requirements  

  - Meteor
  - Firefox

####  Size Warning!
This package is 11mb large, because of the Selenium browser automation server, and will increase the overall size of your application by 11mb!  The good news, however, is that this extra weight won't be shipped down to the client, and is simply bloats the bundle file and adds an unnecessary file to the server.  We're working on providing this in a way that reduces that overhead as well.


####  Installation  
Install Nightwatch and Selenium through Atmosphere or with the Git Clone command.

````sh
# Go to the root of your application
terminal-a$  cd myappdir

# Option A:  Install via Atmosphere
terminal-a$  mrt add selenium-nightwatch

# Option B:  Install with Git Clone
terminal-a$  git clone https://github.com/awatson1978/leaderboard-nightwatch.git /private
````

####  Run Your App For the First Time

Nightwatch works a lot like when you run the ``meteor mongo`` command.  That is, you need to have an instance of meteor running for it work.  More specifically, Nightwatch will attach itself to the compiled version of your app in the ``.meteor/local/build`` directory, and spin up a mirror copy of your app to test with.  Your other app doesn't actually have to be running, but it does need to be run at least once before.

````sh
# Go to the root of your application
terminal-a$ cd myappdir

# run the leaderboard application
terminal-a$ sudo mrt
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

####  Running the Tests  
You'll need to run Nightwatch for the first time with an actual test.  In this example, we'll be attaching to your app, but running a test against Google.  
````sh
# and then, in the same way that we run 'meteor mongo' in a separate terminal
# while our application is already running,
# we want to open up a new terminal, and run nightwatch
terminal-b$ cd packages/selenium-nightwatch
terminal-b$ sudo ./launch_nightwatch_from_package.sh
````

####  Running Tests from App Root
````sh
# and then, in the same way that we run 'meteor mongo' in a separate terminal
# while our application is already running,
# we want to open up a new terminal, and run nightwatch
terminal-b$ ln -s packages/selenium-nightwatch/launch_nightwatch_from_app_root.sh run_nightwatch.sh
terminal-b$ sudo ./run_nightwatch.sh

# you might want to do something clever like pass in arguments and run specific tests
terminal-b$ sudo ./run_nightwatch.sh -t tests/leaderboard.js
````


####  Writing More Complicated Acceptance Tests

Once you have your first test running green, check out the [Nightwatch API](http://nightwatchjs.org/api#assert-attributeEquals), and start creating more advanced tests, like this leaderboard test:
````js
// tests/leaderboard.js

  browser
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

    //.setValue('input[type=text]', 'nightwatch')

    .end();
````

#### Resetting the Database For New Runs
You may notice that your database has gotten out of sync with your tests.  Don't worry, as that's normal.  The easy thing to do is just reset your database.  But you'll eventually need to write your tests so they don't destructively modify your database, or you'll need to create tearUp and tearDown methods, or set up a testing database, or any number of other activities to manage your test data.

````
# if you want to rerun the acceptance tests, go back to the first terminal
# and be sure to reset the database
terminal-a$ ctrl-a
terminal-a$ sudo mrt reset
terminal-a$ sudo mrt
````

####  Configuring a Shared Testing Database
With bigger test suites, you'll maybe want to set up an entire test database, in which case you'll want to attach your Nightwatch instance against a test database.  That's probably getting past the extent of this README, but here's a quick reference to how to do that...

````
# launch your application against a test database
terminal-a$ MONGO_URL=mongodb://127.0.0.1:27017 PORT=3000 node .meteor/local/build/main.js
````


Licensing
------------------------

MIT License. Use as you wish, including for commercial purposes.
