import express from 'express';
const router = express.Router(); 
import transactionController from '../controllers/transactions.js';

//Récuperer les transactions 
router.get('/', transactionController.getTransactions);

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
