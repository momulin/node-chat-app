const path = require('path');
var express = require('express');

var port = process.env.PORT || 3000;
var router = express.Router();
var app = express();
const publicpath = path.join(__dirname,'../public');

router.use(express.static(publicpath));
app.use('/',router);

app.listen(port,()=>{
  console.log('Server is up on '+port);
});
