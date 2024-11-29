const Transaction = require('../models/transactions'); 
//const moment = require('moment'); //load module moment
const asyncHandler = require("express-async-handler"); //gestion auto exceptions 
//Simplifie le code des controllers

//Récuperer les transactions 
exports.getAllTransactions = asyncHandler(async (req, res) => {
    //Simplification gestion erreurs un seul lieu grâce à express-async-handler
   // try {
        const transactions = await Transaction.find();

        //Formater les dates avant envoie au client 
        const formattedTransactions = transactions.map(transaction => {
            //Formater la date au format YYYY-MM-DD
            transaction.date = transaction.date.toISOString().split('T')[0];
            return transaction;
        });

        res.json(formattedTransactions);
   // } catch (error) {
  //      res.status(500).json({ message: error.message});
  //  }
});

//Ajout d'une nouvelle transaction 
exports.addTransaction = asyncHandler(async (req, res) => {
    const { type, categorie, montant, date } = req.body;

    //Assurer que la date est bien au format Date
    const formattedDate = new Date(date);
        
    const newTransaction = new Transaction({ type, categorie, montant, date: formattedDate });
    await newTransaction.save();
    res.status(201).json(newTransaction);
});

//Supprimer une transaction 
exports.deleteTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).send('Transaction supprimée');
});
  
//Modifier une transaction
exports.updateTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, categorie, montant, date } = req.body;
    //Vérifier si la transaction existe déjà 
    const existTransaction = await Transaction.findById(id);
    if (!existTransaction) {
        res.status(404).json({ message: 'Transaction non trouvée' });
    }

    //Assurer que la date est bien au format Date
    const formattedDate = new Date(date); // Assurer que date est un objet Date valide

    //Mettre à jour la transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, { type, categorie, montant ,date: formattedDate }, { new: true });
    res.json(updatedTransaction);
});