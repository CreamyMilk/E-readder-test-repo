const express = require("express");
const multer =  require("multer");

const app = express();
const upload = multer();

app.use(express.static('public'));


app.post('/upload',upload.any(),(req,res) => {
  console.log(req.files);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.end("Done.")
})



app.listen(8080,()=>{
  console.log("Port 8080 is your friend");
});
