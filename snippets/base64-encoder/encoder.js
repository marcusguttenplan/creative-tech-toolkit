var fs = require('fs');
const arg = require('yargs').argv


var img = fs.readFileSync(arg.file, 'base64');

  var json = {
    bytes : {
      b64 : img
    }
  };

fs.writeFile(arg.output, JSON.stringify(json), 'utf8');
