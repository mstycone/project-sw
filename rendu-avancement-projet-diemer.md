Installation de mongodb en locale :

command tools for mongod process : 

```bash
#to start : 
brew services start mongodb-community@8.0
#to stop : 
stop 
#Exécuter une requete : vérfier la version
db.version()
#verify if mongoDB as a macOS service started 
brew services list 
#verifie si mongodb est en cours d'exécution 
ps aux | grep mongod
#Connect to MongoDB 
mongosh 
#Vérifier contenu bdd mongodb
show dbs
use <ma_bdd>
show collections
db.maCollection.find() #Afficher documents une collection
```

cf : https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-install-mdb-community-macos

Installation node.js 

cf : https://nodejs.org/en/download/package-manager

Il y a eu un souci concernant la version de node installé. 

La version installé via brew n'était pas à jour. 

J'ai du réglé ce problème et j'ai pu installé la bonne version de node. 

Installation de express pour le backend 



Installation de mongoose pour la liaison avec MongoDB 

Installation de express 

```bash
mkdir Spendwise
npm install express
npm installer express-generator -g 
express .
npm init -y 
nvm install --lts
node -v #verfi de la version de node 
npm -v #verfi de la version de npm 
```

Installion de la dépendance eslint : 

- la version de développement 

  ```bash
  npm install eslint --save-dev
  ```

Pour run l'application express : 

```bash
DEBUG=<monapp>:* npm start
```

Puis dans un URL : `http://localhost:port/` 

J'ai du revoir la structure (l'arborescence) de mon application 

J'ai bien évidemment du me documenter avant de procéder aux installations 

Documentation sur Express : sources : 

Documentation <a href="https://developer.mozilla.org/fr/docs/Learn/Server-side/Express_Nodejs">MDN</a> : 

- visualisation syntaxe node 

- lecture de la doc sur le `express generator` 

  

- Etc 

Doc Express officiel : 

- <a href="https://expressjs.com/fr/guide/writing-middleware.html">Express : ecriture des middlewares</a> 



