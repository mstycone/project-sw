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
        //default: Date.now
    }, 
}, { timestamps: true }); //Ajout createdAt et updatedAt

/*
//Assurer date stockée UTC à minuit (ajout ou modification)
//Forcer la date en UTC avant save transaction "pre('save')"
TransacSchema.pre("save", function (next) {
    if (this.date) {
        //Convertion UTC et heure à minuit 
        this.date = new Date (this.date.setUTCHours(0, 0, 0, 0));
    }
    next();//étape suivante 
});

//Forcer la date en UTC avant màj transaction
TransacSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();//Récup données màj 
    if (update.date) {
        //Convertion UTC et heure à minuit
        update.date = new Date(new Date (update.date.setUTCHours(0, 0, 0, 0)));
        this.setUpdate(update); //Application modification 
    }
    next();
});
*/


//CommonJS conventions 
//module.exports = mongoose.model('Transaction', TransacSchema);

//Convention ES Modules 
const Transaction = mongoose.model('Transaction', TransacSchema);
export default Transaction;