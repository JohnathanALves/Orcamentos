var express = require('express');
var router = express.Router();
var Moment = require('moment');
var Controller = require('../controllers/orcamentoController');

router.get('/', function(req, res, next){
  console.log('oi');
  next()
});

router.get('/:id', function(req, res, next){ //orcamento por nome de vendedor
  var seller = req.params.id;
  if(seller){

  }
});

router.post('/:id', function(req, res, next){ //novo orcamento
  console.log('cadastro de novo orcamento');
  var data = new Moment(new Date(req.body.data)).format('DD/MM/YYYY');
  var parceiro = req.body.parceiro;
  var vendedor = req.params.id;
  Controller.createOrcamento(data, parceiro,vendedor, function(orc){
    return res.json(orc);
  });
});

router.post('/:id/:cod', function(req, res, next){ //insere produto no orcamento
  var vendedor = req.params.id;
  var codOrcamento = req.params.cod;
});



module.exports = router;
