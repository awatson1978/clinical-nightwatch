SystemWrapper = {
  getFoo: function(){
    console.log('foo');
  },
  standardOutput: function(error, stdout, stderr) {
    var sys = Npm.require('sys');

    sys.puts(stdout);
  }
};


Meteor.methods({
  startRunner: function(){
    console.log('startRunner');

    Npm.require('child_process').exec("pwd", SystemWrapper.standardOutput);
    Npm.require('child_process').exec('echo "------------------------------------"', SystemWrapper.standardOutput);
    Npm.require('child_process').exec("ls -la .", SystemWrapper.standardOutput);
    Npm.require('child_process').exec('echo "------------------------------------"', SystemWrapper.standardOutput);
    Npm.require('child_process').exec("ls -la tests/googleTest", SystemWrapper.standardOutput);

    Npm.require('child_process').exec("nightwatch -t tests/googleTest", SystemWrapper.standardOutput);

    return true;
  }
});
