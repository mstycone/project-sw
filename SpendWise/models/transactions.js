const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransacSchema = new Schema ({
    type: { 
        type: String,
        required: true,
        enum: ["Revenu", "Dépense", "revenu", "depense"],    
    },
    categorie: { 
        type: String,
        required: true,
        trim: true,
    },
    montant: { 
        type: Number,
        required: true,
        min: 0 
    },
    date: { 
        type: Date, 
        require$d: true, 
        default: () => new Date().toISOString().split('T')[0] 
    },
});

module.exports = mongoose.model('Transaction', TransacSchema);