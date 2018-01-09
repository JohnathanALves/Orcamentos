var Orcamento = require('../models/orcamentoModel');
var Produto = require('../models/produtoModel');
var json2csv = require('json2csv');
var fs = require('fs');

module.exports = {
    getOrcamentosByDate: function(start, end, callback) {
        Orcamento.find({ data: { $gte: start, $lte: end } })
            .populate('itens.produto')
            .exec(function(err, result) {
                if (err) return console.log(err);
                return callback(result);
            });
    },

    report: function(callback) {
        this.getOrcamentos(function(dados) {
            var result;
            var fields = ['data', 'parceiro', 'vendedor', 'status', 'itens.produto', 'itens.quantidade', 'itens.valor', 'itens.fechou'];
            var fieldNames = ['data', 'parceiro', 'vendedor', 'situacao', 'produto', 'quantidade', 'valor', 'fechou'];
            var options = {
                data: dados,
                fields: fields,
                fieldNames: fieldNames,
                quotes: ''
            };
            try {
                result = json2csv(options);
            } catch (err) {
                console.log(err);
            }
            let caminho = './public/report.csv';
            fs.writeFile(caminho, result, function(err) {
                if (err) throw err;
                console.log('file saved');
                return callback(caminho);
            });
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
                doc.status = dados.status;
                doc.save(function(err) {
                    if (err) return console.log(err);
                    console.log('New: ', doc);
                    return true;
                });
            });
    },

    deleteByID: function(cod) {
        Orcamento.findByIdAndRemove(cod, function(err, doc) {
            if (err) return console.log(err);
            return doc;
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