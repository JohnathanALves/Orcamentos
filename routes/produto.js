var express = require('express');
var router = express.Router();
var Controller = require('../controllers/produtoController');

router.get('/', function(req, res, next) {
    //retorna uma lista contento dos os produtos
    Controller.getProdutos(function(produtos) {
        return res.json(produtos);
    });
});

router.get('/search/:q', function(req, rex, next) {
    var nome = req.params.q;
    Controller.searchProdutos(nome, function(result) {
        return res.json(result);
    });
});

router.post('/', function(req, res, next) {
    //cria um novo produto
    var nome = req.body.produto;
    var unid = req.body.unidade;
    var conc = req.body.concorrencia;
    if (nome != '' && unid != '' && conc != null) {
        Controller.createProdutos(nome, unid, conc, function(produto) {
            console.log('Novo Produto Criado!');
            console.log(produto);
            return res.json(produto);
        });
    } else {
        return res.send('dados inválidos!');
    }
});

module.exports = router;