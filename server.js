/*const express = require("express");
const multer =  require("multer");

const app = express();
const upload = multer();




app.post('/upload',upload.any(),(req,res) => {
  console.log(req.files);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.end("Done.")
})
*/
const path = require('path');
const fs = require('fs');
const os = require('os');
const cors = require('cors');
const express = require('express');
const app = express();
const Busboy = require('busboy');
app.use(cors());
app.use(express.static('public'));

// accept POST request on the homepage
app.post('/upload', function (req, res) {
  let busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    let saveTo = path.join('./public/pageFlip/SelectPath/pdf-flipbook/uploads/', filename);
    fs.appendFileSync('./public/pageFlip/SelectPath/ListOfFiles.txt', filename+'\n');
    console.log('Uploading: ' + saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function() {
    console.log('Upload complete');
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);

});

let server = app.listen(9020, function () {

let host = server.address().address
let port = server.address().port

console.log('Example app listening at http://%s:%s', host, port)

});
