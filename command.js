var fs = require('fs');
var request = require('request');

function pwd(data, cb) {
  cb(null, '\n' + __dirname + '\nprompt > ');
  // process.stdout.write('\n' + __dirname);
  // process.stdout.write('\nprompt > ');
}

function date(data, cb) {
  cb(null, '\n' + new Date() + '\nprompt > ');
  // process.stdout.write('\n' + new Date());
  // process.stdout.write('\nprompt > ');
}
function ls(data, cb) {
  fs.readdir('.', function (err, files) {
    if (err) throw err;
    cb(null, files.join('\n'));
    cb(null, 'prompt > ');
    // files.forEach(function (file) {
    //   process.stdout.write(file.toString() + '\n');
    // });
    // process.stdout.write('prompt > ');
  });
}
function echo(data, cb) {
  cb(null, '\n' + data + '\nprompt > ');
  // process.stdout.write('\n' + data);
  // process.stdout.write('\nprompt > ');
}

function cat(filenames, cb) {
  filenames.forEach((filename) => {
    fs.readFile(filename, (err, dat) => {
      if (err) {
        cb(err);
      } else {
        cb(null, dat.toString());
      }
    });
  });
  setTimeout(() => {
    cb(null, '\nprompt > ');
  }, 0);
}

function wc(data, cb) {
  cb(null, data.length);
}

function curl(data, cb) {
  request(data[0], function (error, response, body) {
    cb(error, body);
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  });
}

const _commands = {
  cat,
  echo,
  ls,
  wc,
  pwd,
  date,
  curl,
};

const run = (str, cb) => {
  const parts = str.trim().split(' ');
  const command = _commands[parts[0]];
  if (!command) {
    cb(`${parts[0]} command not found`);
  } else {
    command(parts.slice(1), cb);
  }
};

module.exports = {
  run,
};
