var Produto = require('../models/produtoModel');

module.exports = {
    getProdutos: function(){
        Produto.find({}, function(err, res){
          if (err) return console.log(err);
          return res;
        });
      }
};