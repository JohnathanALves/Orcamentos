var Produto = require('../models/produtoModel');

module.exports = {
    getProdutos: function(callback){ // retornar todos os produtos
        Produto.find({}, function(err, res){
          if (err) return console.log(err);
          return callback(res);
        });
      },

    createProdutos: function(nome, unidade, callback){
      console.log('entrou 2');
      var prod = new Produto({
        'produto' : nome,
        'unidade' : unidade
      });
      console.log('entrou');
      prod.save(function(err){
        if(err) return console.log(err);
        return callback(prod);
      });
    }
};