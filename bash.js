var commandrun = require('./command.js');
const chalk = require('chalk');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString();
  commandrun.run(cmd, (err, results) => {
    if (err) {
      console.log(chalk.red(err));
    } else {
      console.log(chalk.green(results));
    }
  });
});
