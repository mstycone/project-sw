const Transaction = require('../models/transactions'); 
const moment = require('moment'); //load module moment

//Récuperer les transactions 
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        //Formater les dates avant envoie au client 
        const formattedTransactions = transactions.map(transaction => {
            transaction.date = moment(transaction.date).format('YYYY-MM-DD');
            return transaction;
        });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//Ajout d'une nouvelle transaction 
exports.addTransaction = async (req, res) => {
    try {
        const { type, categorie, montant, date } = req.body;

        //Formatage de la date en DD-MM-YYYY
        const formattedDate = moment(date, 'YYYY-MM-DD').startOf('day').toDate();
        
        const newTransaction = new Transaction({ type, categorie, montant, date: formattedDate });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error(`Erreur lors de l'ajout de la transaction : ${error}`);
        res.status(500).send(error.message);
    }
};

//Supprimer une transaction 
exports.deleteTransaction = async (req, res) => {
    try {
      const { id } = req.params;
      await Transaction.findByIdAndDelete(id);
      res.status(200).send('Transaction supprimée');
    } catch (error) {
        console.error(`Erreur lors de la suppression de la transaction : ${error}`);
      res.status(500).send(error.message);
    }
};
  
//Modifier une transaction
exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, categorie, montant, date } = req.body;
        //Vérifier si la transaction existe déjà 
        const existTransaction = await Transaction.findById(id);
        if (!existTransaction) {
            res.status(404).json({ message: 'Transaction non trouvée' });
        }

        //Formatage de la date en DD-MM-YYYY
        const formattedDate = moment(date).format('YYYY-MM-DD');

        //Mettre à jour la transaction
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, { type, categorie, montant, date: formattedDate }, { new: true });
        res.json(updatedTransaction);
    } catch (error) {
        console.error(`Erreur lors de l'update de la transaction : ${error}`)
        res.status(500).send(error.message);
    }
};
