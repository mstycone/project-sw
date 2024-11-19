//Charger le module qui gère les erreurs http
const createError = require('http-errors');

//Charger le module express 
const express = require('express');
//charger le path   
const path = require('path');
//Chager le cookieparser 
const cookieParser = require('cookie-parser');
//Chager le module morgan 
const logger = require('morgan');

//Declaration de l'objet app express 
const app = express();

//Déclaration du port 
const port = 3000;

//Charger les routes 
const transacRoutes = require('./routes/transactions');

//Ajout middlewares 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());


//Charger le module mongoose 
const mongoose = require('mongoose');
const mongodb = "mongodb://localhost/spendwise-db";
//Attente connexion à bdd 
main().catch((err) => console.log(err));
async function main() {
    //attend la connection par défaut à mongodb 
    await mongoose.connect(mongodb);
}

//Ajout des routes 
//Routes statiques pour le front-end 
app.use(express.static(path.join(__dirname, 'public')));
//Import des routes back
app.use('/transactions', transacRoutes);

//Gestion des erreurs

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });