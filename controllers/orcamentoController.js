var Orcamento = require('../models/orcamentoModel');
var Produto = require('../models/produtoModel');

module.exports = {
    getOrcamentosByDate: function(start, end, callback) {
        Orcamento.find({ data: { $gte: start, $lte: end } })
            .populate('itens.produto')
            .exec(function(err, result) {
                if (err) return console.log(err);
                return callback(result);
            });
    },

    getOrcamentos: function(callback) {
        Orcamento.find({})
            .populate('itens.produto', ['produto', 'unidade', 'concorrencia'])
            .sort({ data: 'descending' })
            .exec(function(err, result) {
                if (err) return console.log(err);
                return callback(result);
            });
    },

    createOrcamento: function(data, parceiro, vendedor, callback) {
        var orc = new Orcamento({
            data: data,
            parceiro: parceiro,
            vendedor: vendedor,
        });

        orc.save(function(err) {
            if (err) return console.log(err);
            return callback(orc);
        });
    },

    insertProduto: function(cod, codProduto, quantidade, valor, callback) {
        Orcamento.findById(cod, function(err, orc) {
            if (err) return console.log(err);

            Produto.findById(codProduto, function(err, prod) {
                if (err) return console.log(err);
                console.log('opa');
                orc.itens.push({
                    'produto': prod._id,
                    'quantidade': quantidade,
                    'valor': valor
                });
                orc.save(function(err) {
                    if (err) return console.log(err);
                    return callback(orc);
                });
            });
        });
    },

    atualizaOrcamento: function(cod, dados) {
        Orcamento.findById(cod)
            .exec(function(err, doc) {
                console.log('PUT Orcamento:');
                console.log('Old: ', doc);
                doc.data = dados.data;
                doc.parceiro = dados.parceiro;
                doc.itens = dados.itens;
                doc.vendedor = dados.vendedor;
                doc.save(function(err) {
                    if (err) return console.log(err);
                    console.lof('New: ', doc);
                    return true;
                });
            });
    },

    getOrcamentosByID: function(codOrcamento, callback) {
        Orcamento.findById(codOrcamento)
            .populate('itens.produto', ['produto', 'unidade', 'concorrencia'])
            .exec(function(err, orc) {
                if (err) return console.log(err);
                return callback(orc);
            });
    }
}