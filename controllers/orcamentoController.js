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
    Orcamento.find({data : {
      $gte: start,
      $lte: end
    }}, function(err, res){
      if (err) return console.log(err);
      return res;
    });
  },
}
