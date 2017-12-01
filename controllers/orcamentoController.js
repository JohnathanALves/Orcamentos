var Orcamento = require('../models/orcamentoModel');
var Produto = require('../models/produtoModel');

module.exports = {
  getOrcamentosbySeller: function(seller){ //REFAZER URGENTE
    Orcamento.find({'vendedor': seller}, function(err, result){
      if (err) return console.log(err);
      return result;
    });
  },

  getOrcamentosByDate: function(start, end, callback){
    Orcamento.find({ data : { $gte: start, $lte: end} })
    .populate('produto')
    .exec(function(err, result){
      if(err) return console.log(err);
      return callback(result);
    });
  },

  createOrcamento : function (data, parceiro, vendedor, callback){
    var orc = new Orcamento({
      data : data,
      parceiro : parceiro,
      vendedor: vendedor
    });

    orc.save(function(err){
      if (err) return console.log (err);
      return callback(orc);
    });
  },

  insertProduto : function(cod, codProduto, quantidade, valor, callback){
    Orcamento.findById(cod, function(err, orc){
      if (err) return console.log(err);
      
      Produto.findById(codProduto, function(err, prod){
        if (err) return console.log(err);
        console.log('opa');
        orc.itens.push({
          'produto' : prod._id,
          'quantidade' : quantidade,
          'valor' : valor
        });
        orc.save(function(err){
          if(err) return console.log(err);
          return callback(orc);
        });
      });
    });
  }

}
