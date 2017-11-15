var express = require('express');
var router = express.Router();
var Orcamento = require('../models/orcamentoModel');
var Moment = require('moment');


router.get('/', function(req, res, next){
  console.log('oi');
  next()
});

router.get('/:id', function(req, res, next){
  var seller = req.params.id;
  console.log(seller);
  if (seller){
    var query = Orcamento.find({'vendedor': seller});
    query.exec(function(err, docs){
      if (err) console.log(err);
      console.log(docs);
    }).then(res.json(docs));
  }
});

router.post('/:id', function(req, res, next){
  console.log('cadastro de novo orcamento');
  var data = new Moment(req.body.data).format('DD/MM/YYYY');
  console.log(data);
  var parceiro = req.body.parceiro;
  var itens =req.body.itens;
  var vendedor = req.params.id;
  var novoOrcamento = new Orcamento({
    data: data, //ilegivel
    parceiro: parceiro,
    vendedor: vendedor
  });
  for (i in itens){
    novoOrcamento.itens.push({
      produto : itens[i].produto,
      unidade : itens[i].unidade,
      quantidade : itens[i].quantidade,
      vlor  : itens[i].vlor
    });
  }
  novoOrcamento.save(function(err){
    if (err) return console.log(err);
    console.log(novoOrcamento);
  }).then(res.send('foi!'));
});


module.exports = router;
