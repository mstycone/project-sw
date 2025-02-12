import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TransacSchema = new Schema ({
    type: {
        type: String,
        required: true,
        enum: ['revenu', 'dépense'],    
    },
    categorie: {
        type: Schema.Types.ObjectId, //Stocke l'objetid de la catégorie
        ref: 'Categorie',
        required: true,
    },
    description: {
        type: String,
        required: true,
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

//CommonJS conventions 
//module.exports = mongoose.model('Transaction', TransacSchema);

//Convention ES Modules 
const Transaction = mongoose.model('Transaction', TransacSchema);
export default Transaction;