//import createError from 'http-errors';
//Charger le module express 
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
//import dotenv from 'dotenv';
//Importation la ƒ depuis le module 'url'
import {fileURLToPath} from 'url';


//Declaration de l'objet app express 
const app = express();

//Déclaration du port devmode
const port = 3000;

//Charger les routes 
import transacRoutes from './routes/transactions.js';
import catRoutes from './routes/categories.js';

//Création dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Ajout middlewares 
app.use(logger('dev'));
//dotenv.config();
app.use(express.json()); //parser le json
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

const mongodb = "mongodb://localhost/spendwise-db";
//Attente connexion à bdd 
main().catch((err) => console.log(err));
async function main() {
    //attend la connection par défaut à mongodb 
    await mongoose.connect(mongodb);
    console.log("Connexion à MongoDB réussie");
}

//Connection MongoDB en production 
/*
mongoose.connection.on("disconnected", () => {
    console.log("Déconnection de Mongodb");
});

const connect = async () =>{
    try{
        mongoose.connect(process.env.MONGO)
        console.log("Connection à Mongodb ...");
    }catch(err){
        console.log("Erreur lors de la connection à Mongodb:", err);
        process.exit(1) //arrêt de l'app en cas échec connexion (optionnel)
    }
}
*/

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

// Lancer le serveur en mode dev 
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });

//Lancer le serveur en production 
/*
const port = process.env.PORT || 3000; // port définie dans .env ou 3000 par défaut 
app.listen(port , () => { 
    connect(); 
    console.log("Serveur démarré ... ")})
*/