var express = require('express');
var router = express.Router();
var Moment = require('moment');
var Controller = require('../controllers/orcamentoController');

router.get('/', function(req, res, next) {
    Controller.getOrcamentos(function(result) {
        return res.json(result);
    });
});

router.get('/report', function(req, res, next) {
    Controller.report(function(result) {
        res.download(result, 'relatorio.csv');
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
    let vendedor = req.params.id;
    let codOrcamento = req.params.cod;
    let itens = req.body.itens;
    let parceiro = req.body.parceiro;
    let data = req.body.data;
    let status = req.body.status;
    console.log(itens);
    let dados = { 'id': codOrcamento, 'vendedor': vendedor, 'parceiro': parceiro, 'data': data, 'itens': itens, 'status': status };
    let response = Controller.atualizaOrcamento(codOrcamento, dados);
    return res.json(response);
});

router.delete('/:cod', function(req, res, next) {
    let id = req.params.cod;
    console.log('Delete Orcamento by ID: ', id);
    let response = Controller.deleteByID(id);
    return res.json(response);
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