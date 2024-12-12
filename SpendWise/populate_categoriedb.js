import mongoose from 'mongoose';
import Categorie from './models/categories.js';

const initializeCategories = async () => {
    const existingCategories = await Categorie.find();
    if (existingCategories.length === 0) {
        const categories = [
            { name: 'Nourriture', type: 'Dépense' },
            { name: 'Transport', type: 'Dépense' },
            { name: 'Voiture', type: 'Dépense'},
            { name: 'Logement', type: 'Dépense' },
            { name: 'Shopping', type: 'Dépense' },
            { name: 'Services publics', type: 'Dépense'},
            { name: 'Santé', type: 'Dépense' },
            { name: 'Éducation', type: 'Dépense'},
            { name: 'Vacances/voyages', type: 'Dépense' },
            { name: 'Restaurants/cafés', type: 'Dépense'},
            { name: 'Abonnements', type: 'Dépense'},
            { name: 'Salaire', type: 'Revenu' },
            { name: 'Prime&bonus', type: 'Dépense'},
            { name: 'Investissements', type: 'Revenu' },
            { name: 'Loisirs', type: 'Dépense' },
            { name: 'Épargne', type: 'Revenu' },
            { name: 'Autres Dépenses', type: 'Dépense' },
            { name: 'Autres Revenus', type: 'Revenu' },
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
