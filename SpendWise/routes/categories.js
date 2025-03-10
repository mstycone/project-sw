import express from 'express';
const router = express.Router(); 
import transactionController from '../controllers/transactions.js';

//Route pour récupérer toutes les catégories 
router.get('/', transactionController.getCategories)

//Middleware de gestions des erreurs 
router.use((err, req, res, next) => {
    console.error('Erreur dans categories route', err);
    res.status(500).send({ message: 'Erreur dans la récupération des catégories' });
});

export default router;