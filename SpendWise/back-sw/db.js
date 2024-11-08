// bdd

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connexion à MongoDB réussie!');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB:', err.message);
        process.exit(1); //arret processus cas d'erreur
    }
};

module.exports = connectDB; 