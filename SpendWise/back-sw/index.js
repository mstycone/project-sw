const express = require("express");
const connectDB = require('./sw-db');

const app = express();

//connection à mongodb 
connectDB();

//middleware et routes 
const port = 8000;

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port : ${port}!`);
});