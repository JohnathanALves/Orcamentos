var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produto = new Schema({
  produto : String,
  unidade : String,
  quantidade : Number,
  vlor : Number
});

// Schema
var orcamentoSchema = new Schema({
  data : String,
  parceiro: String,
  itens: [produto],
  vendedor: String,
  fechou: {type :Boolean, default: false}
});

var Orcamento = mongoose.model('Orcamento', orcamentoSchema); //creates the model

module.exports = Orcamento; // exports this..
