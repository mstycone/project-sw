import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorieSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true, //Chaque categorie est unique => ø doublons 
        trim: true, //Supp espaces en trop 
    },
    type: {
        type: String,
        required: true,
        enum: ['revenu', 'dépense']
    }
});

const Categorie = mongoose.model('Categorie', CategorieSchema);
export default Categorie;