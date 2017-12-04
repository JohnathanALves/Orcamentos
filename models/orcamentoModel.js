var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Produto = require('./produtoModel');

// Schema
var orcamentoSchema = new Schema({
    data: String,
    parceiro: String,
    itens: [{
        produto: { type: Schema.Types.ObjectId, ref: 'Produto', required: true },
        'quantidade': { type: Number, required: true },
        'valor': { type: Number, required: true },
        fechou: { type: Boolean, default: false }
    }],
    vendedor: String,
    status: { type: Boolean, default: true }

});

var Orcamento = mongoose.model('Orcamento', orcamentoSchema); //creates the model

module.exports = Orcamento; // exports this..