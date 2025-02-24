import mongoose from 'mongoose';
import Categorie from './models/categories.js';
//import dotenv from 'dotenv';

//dotenv.config(); 

const initializeCategories = async () => {
    const existingCategories = await Categorie.find();
    if (existingCategories.length === 0) {
        const categories = [
            { name: 'Nourriture', type: 'dépense' },
            { name: 'Transport', type: 'dépense' },
            { name: 'Voiture', type: 'dépense'},
            { name: 'Logement', type: 'dépense' },
            { name: 'Shopping', type: 'dépense' },
            { name: 'Services publics', type: 'dépense'},
            { name: 'Santé', type: 'dépense' },
            { name: 'Éducation', type: 'dépense'},
            { name: 'Vacances/voyages', type: 'dépense' },
            { name: 'Restaurants/cafés', type: 'dépense'},
            { name: 'Abonnements', type: 'dépense'},
            { name: 'Salaire', type: 'revenu' },
            { name: 'Prime&bonus', type: 'revenu'},
            { name: 'Investissements', type: 'revenu' },
            { name: 'Loisirs', type: 'dépense' },
            { name: 'Épargne', type: 'revenu' },
            { name: 'Autre Dépense', type: 'dépense' },
            { name: 'Autre Revenu', type: 'revenu' },
        ];
        await Categorie.insertMany(categories);
        console.log('Catégories initialisées avec succès');
    } else {
        console.log('Les catégories existent déjà');
    }
};

mongoose.connect('mongodb://localhost:27017/spendwise-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connexion à MongoDB réussie');
    initializeCategories();
}).catch(err => console.error('Erreur de connexion à MongoDB :', err));
