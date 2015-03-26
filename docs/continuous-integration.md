### Travis Continuous Integration  

Need to run your Nightwatch tests whenever you check in a branch to GitHub or generate a pull-request?  You need a Continous Integration server, such as Travis CI (which supports Git hooks).  

And if you're getting to the point where you need a continous-integration server, your project is probably getting big enough that you're doing things creating design docs, defining business requirements, injecting specific data into the database, and the like.  We're going to share a script for deploying to Travis below; but it relies on a particular directory structure of your repository.  In particular, it expects your application to be in the ``webapp`` subdirectory of your repository, and sort of assumes that you're keeping design docs, deploy scripts, database dumps, and the like in your repository also.  


````sh
.git
README.md
/data
/docs
/design
/scripts
/webapp
/webapp/.meteor
/webapp/run_nightwatch.sh
/webapp/client
/webapp/server
.travis.yml
````

So, if you haven't structured your application like this yet, go ahead and move your application into a ``webapp`` directory. After that, just add the following script to a ``.travis.yml`` file in the root of your project directory.

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
  - "cd webapp"
  # Optionally we can update all our dependencies here
  #- "meteor update"
  - "meteor reset"
  - "meteor -p 3000 &"
  # give Meteor some time to download packages, init data, and to start
  - "sleep 50"

script: ./run_nightwatch.sh
````

#### Contributors  
Big thanks to Alan Blount for his help in figuring this integration out!  
[meteor-travis-ci-nightwatch](https://github.com/zeroasterisk/meteor-travis-ci-nightwatch)
