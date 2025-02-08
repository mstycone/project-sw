import Transaction from '../models/transactions.js'; 
import Categorie from '../models/categories.js';
import asyncHandler from 'express-async-handler'; //gestion auto des exceptions 

//Récuperer les transactions 
const getAllTransactions = asyncHandler(async (req, res) => {
    console.log('Requête pour récupérer toutes les transactions'); // Log de la requête
    const transactions = await Transaction.find().populate('categorie', 'name'); 
    const formattedTransactions = transactions.map(transaction => ({
        ...transaction.toObject(),
        categorie: transaction.categorie.name 
    }));
    console.log('Transactions avant formatage:', transactions);
    console.log('Transactions formatées:', formattedTransactions);

    res.json(formattedTransactions);
});

//Ajout d'une nouvelle transaction 
const addTransaction = asyncHandler(async (req, res) => {
    console.log('Données de la transaction reçues:', req.body); // Log des données reçues
    const { type, categorie: categoryName, description, montant, date } = req.body;
    console.log('Données de la requête reçues:', req.body); // Log des données reçues
    console.log('Nom de la catégorie:', categoryName); // Log du nom de la catégorie
    const formattedDate = new Date(date);
    
    // Fetch the ObjectId for the category
    let category = await Categorie.findOne({ name: categoryName });
    console.log('Catégorie recherchée:', categoryName); // Log de la catégorie recherchée
    if (!category) {
        console.log('Catégorie introuvable:', categoryName); // Log if category is not found
        // Create a new category if it doesn't exist
        const newCategory = new Categorie({ name: categoryName, type: type });
        category = await newCategory.save(); // Save the new category
        console.log('Nouvelle catégorie créée:', category); // Log the new category creation
    } else {
        console.log('Catégorie trouvée:', category); // Log de la catégorie trouvée
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
        // Calculer les valeurs mises à jour
        const totalIncome = await Transaction.aggregate([{ $match: { type: 'revenu' } }, { $group: { _id: null, total: { $sum: '$montant' } } }]);
        const totalExpense = await Transaction.aggregate([{ $match: { type: 'dépense' } }, { $group: { _id: null, total: { $sum: '$montant' } } }]);
        const currentBalance = (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0);

        // Renvoie les nouvelles valeurs
        res.status(201).json({ newTransaction, currentBalance, totalIncome: totalIncome[0]?.total || 0, totalExpense: totalExpense[0]?.total || 0 });
    } catch (error) {
        console.error('Erreur de sauvegarde de la transaction:', error); // Log any errors
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
    console.log('Categories retrieved:', categories); // Log the retrieved categories
    res.status(200).json(categories);
});

// Récupérér les 5 dernières transactions 
const getLastTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find()
        .populate('categorie', 'name') // Peupler le nom de la catégorie
        .sort({ date: -1 }) //organiser par date décroissant
        .limit(5); //Limiter aux 5 dernières transactions 
    res.status(200).json(transactions);
    console.log('Transactions avant formatage:', transactions);
});

//Regroupement toutes méthodes dans un objet  
const transactionController = {
    getAllTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getAllCategories,
    getLastTransactions 
};

//Exportation objet par défaut 
export default transactionController;
