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
        required: true, 
        default: Date.now 
    },
});

//Possibilité d'utilisé un virtual ici

module.exports = mongoose.model('Transaction', TransacSchema);