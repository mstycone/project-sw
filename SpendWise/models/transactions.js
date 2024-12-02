import mongoose from 'mongoose';

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

//Possibilité d'utilisé un virtual pour la date ici

//CommonJS conventions 
//module.exports = mongoose.model('Transaction', TransacSchema);

//Convention ES Modules 
const Transaction = mongoose.model('Transaction', TransacSchema);
export default Transaction;