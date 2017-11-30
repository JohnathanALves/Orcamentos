var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Produto = require('./produtoModel');

// Schema
var orcamentoSchema = new Schema({
  data : String,
  parceiro: String,
  itens: [
    {
      produto : {type: Schema.Types.ObjectId, ref:'Produto'}, 
      'quantidade': {type: Number, required: true},
      'valor' : {type: Number, required: true}
    }
  ],
  vendedor: String,
  fechou: {type :Boolean, default: false}
});

var Orcamento = mongoose.model('Orcamento', orcamentoSchema); //creates the model

module.exports = Orcamento; // exports this..
