// models/transactions 
const mongoose = require('mongoose');

const transacSchema = new mongoose.Schema({
    type:{ type: String, enum: ['revenu', 'depense'], required: true}, 
    categorie: {type: String, required: true}, 
    amount:{type: Number, required: true},
    date: {type: Date, default: Date.now},
    description: {type: String},
}); 

const transactions = mongoose.model('transactions', transacSchema);

module.exports = transactions;