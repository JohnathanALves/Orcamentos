var Orcamento = require('../models/orcamentoModel');
var Produto = require('../models/produtoModel');

module.exports = {
  getOrcamentosbySeller: function(seller){
    Orcamento.find({'vendedor': seller}, function(err, result){
      if (err) return console.log(err);
      return result;
    });
  },

  getOrcamentosByDate: function(start, end){
    Orcamento.find({ data : { $gte: start, $lte: end} })
    .populate('produto')
    .exec(function(err, result){
      if(err) return console.log(err);
      return result;
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

  insertProduto : function(cod, codProduto, quantidade, valor){
    
  }

}
