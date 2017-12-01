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

router.get('/data/:dtIn/:dtFim', function(req, res, next){
  var dtIn = new Moment(new Date(req.params.dtIN))
  var dtFim = new Moment(new  Date(req.params.dtFim))
  Controller.getOrcamentosByDate(dtIn, dtFim, function(resultado){
    console.log(resultado);
    return res.json(resultado);
  });

});

router.post('/:id', function(req, res, next){ //novo orcamento
  console.log('cadastro de novo orcamento');
  var data = new Moment(new Date(req.body.data))
  var parceiro = req.body.parceiro;
  var vendedor = req.params.id;
  Controller.createOrcamento(data, parceiro,vendedor, function(orc){
    return res.json(orc);
  });
});

router.post('/:id/:cod', function(req, res, next){ //insere produto no orcamento
  var vendedor = req.params.id;
  var codOrcamento = req.params.cod;
  var codProduto = req.body.codProduto;
  var quantidade = req.body.quantidade;
  var valor = req.body.valor;

  Controller.insertProduto(codOrcamento, codProduto, quantidade, valor, function(orcamento){
    console.log(orcamento);
    return res.json(orcamento);
  });
});



module.exports = router;
