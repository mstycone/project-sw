//models/catergorie 
const mongoose = require('mongoose');

const categSchema = new mongoose.Schema({
    
});

const categorie = mongoose.model('categorie', categSchema);

module.exports = categorie;