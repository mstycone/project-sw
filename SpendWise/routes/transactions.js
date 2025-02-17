import express from 'express';
const router = express.Router(); 
import transactionController from '../controllers/transactions.js';

//Récuperer toutes les transactions 
router.get('/', transactionController.getAllTransactions);

// Récupérer les 5 dernières transactions
router.get('/last-5', transactionController.getLastTransactions);

//Récupérer transactions filtrées selon période
router.get('/filter-transac', transactionController.getFilteredTransactions);

//Ajouter une nouvelle transaction 
router.post('/', transactionController.addTransaction);

//Supprimer une transaction 
router.delete('/:id', transactionController.deleteTransaction);

//Modifier une transaction 
router.put('/:id', transactionController.updateTransaction);

//Middleware de gestions des erreurs 
router.use((err, req, res, next) => {
    console.error('Erreur dans transaction route', err);
    res.status(500).send({ message: 'Erreur dans la gestion des transactions' });
});

//module.exports = router; => Convention CommonJS 

//Convention ES Modules 
export default router;
