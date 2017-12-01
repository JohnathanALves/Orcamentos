var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //database
mongoose.Promise = require('bluebird');

var app = express();

//database connection
var uri = 'mongodb://127.0.0.1:27017/orcamento'
mongoose.connect(uri, {useMongoClient: true});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + uri);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// carregamento de rotas

var main = require('./routes/main'); // inicial
var orcamento = require('./routes/orcamento'); 
var produto = require('./routes/produto'); 

// use routes
app.use('/', main);
app.use('/orcamento', orcamento);
app.use('/produto', produto);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  res.send('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('error');
  console.log(err.message);
});

module.exports = app;
