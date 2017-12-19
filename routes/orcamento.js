var express = require('express');
var router = express.Router();
var Moment = require('moment');
var Controller = require('../controllers/orcamentoController');

router.get('/', function(req, res, next) {
    Controller.getOrcamentos(function(result) {
        console.log(result);
        return res.json(result);
    });
});

router.get('/:id', function(req, res, next) { //orcamento por id
    var orcamento = req.params.id;
    Controller.getOrcamentosByID(orcamento, function(orc) {
        console.log("Get Orcamento By ID: ");
        console.log(orc);
        return res.json(orc);
    });
});

router.get('/data/:dtIn/:dtFim', function(req, res, next) {
    var dtIn = new Moment(req.params.dtIN);
    var dtFim = new Moment(req.params.dtFim);
    console.log(dtIn);
    console.log(dtFim);
    Controller.getOrcamentosByDate(dtIn, dtFim, function(resultado) {
        console.log(resultado);
        return res.json(resultado);
    });

});

router.post('/:id', function(req, res, next) { //novo orcamento
    console.log('cadastro de novo orcamento');
    var data = new Moment(new Date(req.body.data))
    var parceiro = req.body.parceiro;
    var vendedor = req.params.id;
    Controller.createOrcamento(data, parceiro, vendedor, function(orc) {
        console.log(orc);
        return res.json(orc);
    });
});

router.put('/:id/:cod', function(req, res, next) { //atualiza dados de orcamento
    var vendedor = req.params.id;
    var codOrcamento = req.params.cod;
});

router.post('/:id/:cod', function(req, res, next) { //insere produto no orcamento
    var vendedor = req.params.id;
    var codOrcamento = req.params.cod;
    var codProduto = req.body.codProduto;
    var quantidade = req.body.quantidade;
    var valor = req.body.valor;

    Controller.insertProduto(codOrcamento, codProduto, quantidade, valor, function(orcamento) {
        console.log(orcamento);
        return res.json(orcamento);
    });
});



module.exports = router;