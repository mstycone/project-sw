#!/bin/zsh

#Démarrer le service mongodb 
brew services start mongodb-community@8.0

#démarrer server back mode dev
npm run dev
