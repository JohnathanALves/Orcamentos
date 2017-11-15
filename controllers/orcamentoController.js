var Orcamento = require('../models/orcamentoModel');

module.exports = {
  var getOrcamentosbySeller = function(seller){
    console.log('entrei');
    Orcamento.find('vendedor': seller, function(err, result){
      if (err) return console.log(err);
      return result;
    });
  }
}
