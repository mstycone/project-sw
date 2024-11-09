const express = require("express");
const connectDB = require('./sw-db');
const transacRoutes = require('./routes/transactions');

const app = express();

//connection à mongodb 
connectDB();

  //middleware et routes 
//Use route de transaction 
app.use('/api/transactions', transacRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port : ${port}!`);
});