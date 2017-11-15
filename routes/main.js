var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
  console.log('funcionou!');
  res.send('oi');
});

module.exports = router;
