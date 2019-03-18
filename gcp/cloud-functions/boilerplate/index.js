const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
    projectId: 'go-handler',
    keyFilename: './creds.json'
});

const stream = require('stream');

exports.boilerplate = (req, res) => {
    console.log("Function Fired!");
    console.log("___________________________________");
    var bufferStream = new stream.PassThrough();

    // CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //respond to CORS preflight requests
    if (req.method == 'OPTIONS') {
        res.status(204).send('');
    }

    console.log(req.body)
    // res.status(200).send("Success");

    // Define bucket.
    var bucket = storage.bucket('go-uploads');

    // Define file & file name.
    var file = bucket.file(Date.now() + '_' + req.body.id + '.png');

    // Read file buffer
    bufferStream.end(Buffer.from(req.body.img, 'base64'));
    console.log("writing image");

    // Pipe the 'bufferStream' into a 'file.createWriteStream' method.
    bufferStream.pipe(file.createWriteStream({
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            custom: 'metadata'
          }
        },
        public: true,
        validation: "md5"
      }))
      .on('error', function(err) {
          console.log("GS err", err);
          res.status(500).send("Error");
      })
      .on('finish', function() {
          console.log("GS success");
          // bufferStream.end()
          res.status(200).send("Success");
      });
};
