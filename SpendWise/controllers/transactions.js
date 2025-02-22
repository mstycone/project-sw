import Transaction from '../models/transactions.js'; 
import Categorie from '../models/categories.js';
import asyncHandler from 'express-async-handler'; //gestion auto des exceptions/erreurs 
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'; //Import extension officielle

dayjs.extend(utc);

//Récuperer les transactions 
const getAllTransactions = asyncHandler(async (req, res) => {
    console.log('Requête pour récupérer toutes les transactions'); // Log de la requête
    const transactions = await Transaction.find()
    .populate('categorie', 'name')
    .sort({date: -1}); 
    
    //Formatage pour renvoyer `categorie` en tant que texte et non objet
    const formattedTransactions = transactions.map(transaction => ({
        ...transaction.toObject(),
        categorie: transaction.categorie.name 
    }));
    console.log('Transactions avant formatage:', transactions);
    console.log('Transactions formatées:', formattedTransactions);
    
    res.json(formattedTransactions);
});

// Récupérér les 5 dernières transactions 
const getLastTransactions = asyncHandler(async (req, res) => {
    console.log('Requête reçue : récupération des last 5 transactions'); // Vérification
    const transactions = await Transaction.find()
        .populate('categorie', 'name') // Peupler le nom de la catégorie
        .sort({ date: -1 }) //organiser par date décroissant
        .limit(5); //Limiter aux 5 dernières transactions 
    
    //Formatage pour renvoyer `categorie` en tant que texte et non objet
    const formattedTransactions = transactions.map(transaction => ({
        ...transaction.toObject(),
        categorie: transaction.categorie.name //categorie stocké sous form ID(ObjectId)
        //populate nécessaire sinon transaction.categorie.name est undefined 
        
    }));

    console.log('Transactions avant formatage:', transactions);
    console.log('Transactions formatées:', formattedTransactions);
    
    res.json(formattedTransactions);
});

//Filtrer les transactions par periode
const getFilteredTransactions = asyncHandler(async (req, res) => {

    let {filter} = req.query; //récup filtre req GET
    let today = dayjs().utc();//use UTC pour today date 
    let startDate, endDate;

    switch (filter) {

        case 'last7days':
            startDate = today.subtract(7, 'days').startOf('day');
            break;

        case 'last30days':
            startDate = today.subtract(30, 'days').startOf('day');
            break;

        case 'currentMonth':
            startDate = today.startOf('month');
          break;

        case 'currentYear':
            startDate = today.startOf('year');
          break;

        default:
          startDate = null; //no filtre
    }

    //Build filtre requête mongodb
    let query = startDate ? { date: { $gte: startDate.toDate()}} : {};

    const transactions = await Transaction
        .find(query)
        .populate('categorie', 'name') // Peupler le nom de la catégorie
        .sort({date: -1});

    const formattedTransactions = transactions.map(transaction => ({
        ...transaction.toObject(),
        categorie: transaction.categorie.name
    }));

    res.status(200).json(formattedTransactions);
})

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

//Récupérer les catégories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Categorie.find()
    .sort({ name: 1 });//organiser par nom croissant

    categories.sort((a,b) =>
        (a.name.startsWith("Autre") ? 1 : 0) - (b.name.startsWith("Autre") ? 1 : 0) ||
        a.name.localeCompare(b.name) // Garde ordre asc pour le reste
    );
    
    console.log('Categories retrieved:', categories); // Log the retrieved categories
    res.status(200).json(categories);
});

//Récupérer les principales catégories selon dépense total + filtre periode
const getTopCategories = asyncHandler(async (req, res) => {

    let {filter} = req.query; //récup filtre req GET
    let today = dayjs().utc();//use UTC pour today date 
    let startDate, endDate;

    switch (filter) {

        case 'last7days':
            startDate = today.subtract(7, 'days').startOf('day');
            break;

        case 'last30days':
            startDate = today.subtract(30, 'days').startOf('day');
            break;

        case 'currentMonth':
            startDate = today.startOf('month');
          break;

        case 'currentYear':
            startDate = today.startOf('year');
          break;

        default:
          startDate = null; //no filtre
    }

    //Build filtre requête mongodb
    let query = { type: 'dépense' }; //filtre dépenses 
    if (startDate) { 
        query.date = { $gte: startDate.toDate()}; // Filtrer transactions par date
    }
    console.log("Récupération des top catégories...");
    
    //Récup' catégories trier par montant 
    const allCategories = await Transaction.aggregate([
        { $match: query}, //filtre dépense only
        { $group: { //regrouper par catégorie
            _id: '$categorie',
            total: { $sum: '$montant' } } 
        }, 
        { $sort: { total: -1}},
        { $lookup: {
            from: 'categories', //Collection
            localField: '_id', //liaison id Transactions.categorie
            foreignField: '_id', //id Categories
            as: 'categorieInfo' //nom de la nouvelle propriété
        }},
        { $addFields: {
            name: { $arrayElemAt: ["$categorieInfo.name", 0]} //Extrait nom catégorie
        }},
        { $project: { //garde name et total only 
            _id: 0,
            name: 1,
            total: 1
        }}
        //{ $limit: 10} à voir par la suite
    ]);

    console.log("Catégories récupérées:", allCategories);

    //Extrait top5 et addition des autres 
    const top5 = allCategories.slice(0, 5);
    console.log("Top 5 catégories:", top5);

    const othersTotal = allCategories.slice(5)
    .reduce((sum, cat) => sum += cat.total, 0);
    console.log("Total autres catégories:", othersTotal);


    //Ajout catégorie "Autres"
    if (othersTotal > 0) {
        top5.push({ total: othersTotal, name: "Autres" });
    }

   console.log("Top 5 catégories (et Autres) :", top5);

    res.status(200).json(top5);  
});

//Regroupement toutes méthodes dans un objet  
const transactionController = {
    getAllTransactions,
    getLastTransactions,
    getFilteredTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getAllCategories,
    getTopCategories
};

//Exportation objet par défaut 
export default transactionController;
