var Produto = require('../models/produtoModel');

module.exports = {
    getProdutos: function(callback) { // retornar todos os produtos
        Produto.find({}, function(err, res) {
            if (err) return console.log(err);
            return callback(res);
        });
    },

    createProdutos: function(nome, unidade, conc, callback) {
        var prod = new Produto({
            'produto': nome,
            'unidade': unidade,
            'concorrencia': conc
        });
        prod.save(function(err) {
            if (err) return console.log(err);
            return callback(prod);
        });
    },
    searchProdutos: function(produto, callback) {
        Produto.find({
                produto: new RegExp(produto, "i")
            })
            .limit(5)
            .exec(function(err, docs) {
                if (err) return console.log(err);
                return callback(docs);
            });
    }
};