const Transaction = require('../models/transactions'); 
//const moment = require('moment'); //load module moment
const {DateTime} = require('luxon'); //load le module luxon
const asyncHandler = require("express-async-handler"); //gestion auto exceptions 
//Simplifie le code des controllers

//Récuperer les transactions 
exports.getAllTransactions = asyncHandler(async (req, res) => {
    //Simplification gestion erreurs un seul lieu grâce à express-async-handler
   // try {
        const transactions = await Transaction.find();

        //Formater les dates avant envoie au client 
        const formattedTransactions = transactions.map(transaction => {
            //transaction.date = moment(transaction.date).format('YYYY-MM-DD');    
            //formatage utilisant luxon         
            transaction.date = DateTime.fromJSDate(transaction.date).toFormat('YYYY-MM-DD');
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

    //Formatage de la date en DD-MM-YYYY
    //const formattedDate = moment(date, 'YYYY-MM-DD').startOf('day').toDate();
    //Formatage utilisant luxon 
    const formattedDate = DateTime.fromISO(date, { zone: 'utc' }).startOf('day').toJSDate(); //Conversion en objet Date JS
        
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

    //Formatage de la date en DD-MM-YYYY
    //const formattedDate = moment(date).format('YYYY-MM-DD');
    //Formatage utilisant luxon
    const formattedDate = DateTime.fromISO(date, { zone: 'utc' }).toFormat('YYYY-MM-DD');

    //Mettre à jour la transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, { type, categorie, montant, date: formattedDate }, { new: true });
    res.json(updatedTransaction);
});
