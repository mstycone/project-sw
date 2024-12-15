import Transaction from '../models/transactions.js'; 
import Categorie from '../models/categories.js';
import asyncHandler from 'express-async-handler'; //gestion auto des exceptions 

//Récuperer les transactions 
const getAllTransactions = asyncHandler(async (req, res) => {    
    const transactions = await Transaction.find().populate('categorie', 'name'); 
    const formattedTransactions = transactions.map(transaction => ({
        ...transaction.toObject(),
        categorie: transaction.categorie.name 
    }));
    res.json(formattedTransactions);
});

//Ajout d'une nouvelle transaction 
const addTransaction = asyncHandler(async (req, res) => {
    const { type, categorie: categoryName, description, montant, date } = req.body;
    console.log('Transaction data received:', req.body); // Log incoming data
    const formattedDate = new Date(date);
    
    // Fetch the ObjectId for the category
    const category = await Categorie.findOne({ _id: categoryName });
    if (!category) {
        console.log('Category not found:', categoryName); // Log if category is not found
        return res.status(400).json({ message: 'Catégorie non trouvée' });
    }

    const newTransaction = new Transaction({ 
        type,
        categorie: category._id, // Use the ObjectId
        description, 
        montant, 
        date: formattedDate
    });

    try {
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error saving transaction:', error); // Log any errors
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la transaction' });
    }
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
    const { type, categorie: categoryName, description, montant, date } = req.body;
    
    // Fetch the ObjectId for the category
    const category = await Categorie.findOne({ name: categoryName });
    if (!category) {
        return res.status(400).json({ message: 'Catégorie non trouvée' });
    }

    const existTransaction = await Transaction.findById(id);
    if (!existTransaction) {
        return res.status(404).json({ message: 'Transaction non trouvée' });
    }
    const formattedDate = new Date(date);
    const updatedTransaction = await Transaction.findByIdAndUpdate(
        id, 
        { type, categorie: category._id, description, montant, date: formattedDate },
        { new: true }
    );
    res.json(updatedTransaction);
});

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Categorie.find();
    res.status(200).json(categories);
});

// Récupérér les 5 dernières transactions 
const getLastTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find()
        .sort({ date: -1 }) //organiser par date décroissant
        .limit(5); //Limiter aux 5 dernières transactions 
    res.status(200).json(transactions);
});

//Regroupement toutes méthodes dans un objet  
const transactionController = {
    getAllTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getAllCategories,
    getLastTransactions // Add the new function to the exported object
};

//Exportation objet par défaut 
export default transactionController;
