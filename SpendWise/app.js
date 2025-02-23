//import createError from 'http-errors';
//Charger le module express 
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
//Importation la ƒ depuis le module 'url'
import {fileURLToPath} from 'url';



//Declaration de l'objet app express 
const app = express();

//Charger les routes 
import transacRoutes from './routes/transactions.js';
import catRoutes from './routes/categories.js';

//Création dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Ajout middlewares 
app.use(logger('dev'));
dotenv.config();
app.use(express.json()); //parser le json
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());



//Ajout des routes 
//Routes statiques pour le front-end avec path 
app.use(express.static(path.join(__dirname, 'public'))); 

//Import des routes back
app.use('/transactions', transacRoutes);
app.use('/categories', catRoutes);

//Middelware gestion des erreurs globale
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Une erreur est survenue';
    //Ne montrer la stack trace qu'en mode dev
    const stackTrace = req.app.get('env') === 'development' ? err.stack : undefined;
    
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack: stackTrace
    });
});

//Connection en dev mod
/*
const mongodb = "mongodb://localhost/spendwise-db";
//Attente connexion à bdd 
main().catch((err) => console.log(err));
async function main() {
    //attend la connection par défaut à mongodb 
    await mongoose.connect(mongodb);
    console.log("Connexion à MongoDB réussie");
}
*/

//Connection MongoDB en production 

//console.log("MONGO_URI", process.env.MONGO_URI); Vérifie l'affichage

//Avec une variable env
//const mongodb = process.env.MONGO_URI

const encodePassword = encodeURIComponent(process.env.MONGO_PASS);

//Connection selon environnement 
const mongodb = process.env.MONGO_URI || `mongodb://${process.env.MONGO_USER}:${encodePassword}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;  //Chargement .env 

// Attente de la connexion à MongoDB
async function main() {
    try {
        await mongoose.connect(mongodb);/*, {
            //Déprécié pas nécessaire avec Mongoose 6+
            //useNewUrlParser: true, 
            //useUnifiedTopology: true
        });*/
        console.log("Connexion à MongoDB réussie");
    } catch (err) {
        console.error("Erreur de connexion à MongoDB :", err);
        process.exit(1); // Arrête l'application si la connexion échoue
    }
}
main();

// Lancer le serveur en mode dev 
/*

//Déclaration du port devmode
const port = 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
*/

//Lancer le serveur en production 

const port = process.env.PORT || 3000; // port définie dans .env ou 3000 par défaut 

app.listen(port , () => { 
    //connect(); 
    console.log(`Serveur démarré sur http://localhost:${port}` );
    //console.log("Serveur démarré ..."" );
});
