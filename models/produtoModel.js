var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var produto = new Schema({
    produto : String,
    unidade : String
});


var Produto = mongoose.model('Produto', produtoSchema); //creates the model

module.exports = Produto; // exports this..