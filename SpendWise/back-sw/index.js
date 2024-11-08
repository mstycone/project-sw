const express = require("express");
const connectDB = require('./db');

const app = express();

//connection à mongodb 
connectDB();

//middleware et routes 
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port : ${port}!`);
});