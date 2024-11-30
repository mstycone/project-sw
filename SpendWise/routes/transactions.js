const express = require("express");
const router = express.Router(); 
//Possibilité utiliser luxon ou moment 
const transactionController = require('../controllers/transactions');

//Récuperer toutes les transactions 
router.get('/', transactionController.getAllTransactions);

//Ajouter une nouvelle transaction 
router.post('/', transactionController.addTransaction);

//Supprimer une transaction 
router.delete('/:id', transactionController.deleteTransaction);

//Modifier une transaction 
router.put('/:id', transactionController.updateTransaction);

//Middleware de gestions des erreurs 
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: 'Une erreur est survenue' });
});

module.exports = router;