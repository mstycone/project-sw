import Transaction from '../models/transactions.js'; 
import Categorie from '../models/categories.js';
import asyncHandler from 'express-async-handler'; //gestion auto des exceptions 
//asyncHandler simplifie le code des controllers

//Récuperer les transactions 
//Common JS convention 
//exports.<nom> = ...

///Convention ES Modules 
const getAllTransactions = asyncHandler(async (req, res) => {    
    //Simplification gestion erreurs un seul lieu grâce à express-async-handler
   // try {
        //Récuperer transactions et peupler ke champ categorie
        const transactions = await Transaction.find().populate('categorie', 'name'); //Spécifie champ voulu

        //Remplacer la categorie par son nom 
        const formattedTransactions = transactions.map(transaction => ({ //map permet transformer chaque transaction
            ...transaction.toObject(),
            categorie: transaction.categorie.name //Remplacer l'objet catégorie par son nom 
        }));

        res.json(formattedTransactions);
   // } catch (error) {
  //      res.status(500).json({ message: error.message});
  //  }
});

//Ajout d'une nouvelle transaction 
const addTransaction = asyncHandler(async (req, res) => {
    const { type, categorie, description, montant, date } = req.body;

    //Assurer que la date est bien au format Date
    const formattedDate = new Date(date);
        
    const newTransaction = new Transaction({ 
        type,
        categorie, 
        description, 
        montant, 
        date: formattedDate
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
});

//Supprimer une transaction 
const deleteTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).send('Transaction supprimée');
});
  
//Modifier une transaction
const updateTransaction = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type, categorie, description, montant, date } = req.body;
    //Vérifier si la transaction existe déjà 
    const existTransaction = await Transaction.findById(id);
    if (!existTransaction) {
        res.status(404).json({ message: 'Transaction non trouvée' });
    }

    //Assurer que la date est bien au format Date
    const formattedDate = new Date(date); // Assurer que date est un objet Date valide

    //Mettre à jour la transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
        id, 
        { type, categorie, description, montant ,date: formattedDate },
        { new: true }
    );
    res.json(updatedTransaction);
});

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Categorie.find();
    res.status(200).json(categories);
});
///Convention ES Modules///

//Regroupement toutes méthodes dans un objet  
const transactionController = {
    getAllTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getAllCategories
};

//Exportation objet par défaut 
export default transactionController;