// routes/transactions 
const express = require('express');

const transaction = require('../models/transaction');
const router = express.Router();

//route ajout new transactioon 
router.post('', async(req, res) => {
    try{
        const newTransaction = new transaction(req.body);
        await newTransaction.save();
        res.status(201).json(transactions);
    }catch (err){
        res.status(500).json({message: 'Erreur lors de la saisie de la transaction', erre});
    }
})

module.exports = router;