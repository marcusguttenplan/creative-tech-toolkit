const fs = require('fs');

function writeFile(arr) {
    console.log('writing file')
    fs.writeFile('<FILENAME>', JSON.stringify(arr), 'utf8', function(err) {
        console.log(err);
    });
}
