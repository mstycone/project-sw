<h1>Documentation du projet SpendWise</h1>



## **1. Introduction**

**Présentation du projet :** SpendWise est une application de gestion des finances personnelles permettant aux utilisateurs de suivre et d’analyser leurs transactions financières (revenus et dépenses). L’application fournit des graphiques et des visualisations pour aider à la gestion des finances, en permettant aux utilisateurs de mieux comprendre où va leur argent.

**Contexte et objectifs :** Le projet a été conçu pour répondre à la problématique de la gestion financière personnelle (moi-même). Il permet aux utilisateurs d'ajouter des transactions, de les catégoriser, et de visualiser l'évolution de leurs finances grâce à des graphiques dynamiques.

------

## **2. Technologies et outils utilisés**

**Frontend :**

- **HTML** : Structure de la page web et des formulaires.
- **CSS** : Mise en forme et design de l'application.
- **JavaScript** : Logique côté client, gestion des événements et manipulation des DOM.
- **Chart.js** : Bibliothèque utilisée pour créer les graphiques (histogrammes et diagrammes circulaires).
- **LocalStorage** : Utilisé pour stocker les transactions de manière temporaire dans le navigateur de l'utilisateur (Lors des premièrs essaies)

**Backend :** (délaissement du localstorage)

- **Node.js** : Environnement d'exécution côté serveur.
- **Express.js** : Framework pour construire les API RESTful.
- **MongoDB** : Base de données NoSQL utilisée pour stocker les transactions.
- **Mongoose** : Bibliothèque pour interagir avec MongoDB de manière simple et organisée.

**Outils de développement :**

- **Nodemon** : Utilisé pour recharger automatiquement l'application lors de modifications dans le code.
- **Postman** : Outil pour tester les API RESTful et vérifier les routes du serveur.

------

## **3. Architecture du projet**

Le projet se divise en deux principales parties :

1. **Frontend** (Côté client) : Contient l'interface utilisateur, les formulaires pour ajouter des transactions, et les pages de visualisation avec des graphiques.
2. **Backend** (Côté serveur) : Fournit une API RESTful pour gérer les transactions (ajout, suppression, modification, récupération). Les données sont stockées dans une base de données MongoDB.

### **Structure des fichiers :**

- `app.js` : Fichier principal qui lance l’application backend.
- `models/transactions.js` : Modèle Mongoose définissant la structure des transactions dans la base de données.
- `controllers/transactions.js` : Logique métier pour manipuler les transactions (CRUD).
- `routes/transactions.js` : Définition des routes pour chaque opération sur les transactions.
- `public/` : Contient les fichiers statiques (HTML, CSS, JS) pour l’interface utilisateur.
- `views/` : Si un moteur de template est utilisé, ce dossier peut contenir des fichiers de vue (ex. EJS, Pug).
- `package.json` : Gestion des dépendances du projet et des scripts de démarrage.

------

## **4. Fonctionnalités principales**

### **a. Gestion des transactions :**

L’application permet à l’utilisateur de :

- Ajouter une transaction (revenu ou dépense).
- Supprimer une transaction.
- Modifier une transaction existante.
- Consulter toutes les transactions enregistrées.

### **b. Visualisation des transactions :**

L’application génère deux types de graphiques :

1. **Graphique des Revenus vs Dépenses** : Un graphique à barres permettant de comparer le total des revenus et des dépenses.
2. **Répartition des Dépenses** : Un graphique circulaire affichant la répartition des dépenses par catégorie.

------

## **5. Description technique**

### **Backend - Serveur Express :**

1. **Modèle de données (Mongoose) :** Le modèle `Transaction` est défini avec les attributs suivants :

   - **type** : Indique si la transaction est un revenu ou une dépense.

   - **categorie** : Catégorie de la transaction (ex. alimentation, loisirs, etc.).

   - **montant** : Montant de la transaction.

   - **date** : Date de la transaction, avec une valeur par défaut (date actuelle).

     ![cap-models-transac](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/cap-models-transac.png)

2. **Routes du serveur (Express)** : Les routes définissent les actions permettant de manipuler les transactions :

- **GET `/transactions`** : Récupérer toutes les transactions.
- **POST `/transactions`** : Ajouter une nouvelle transaction.
- **DELETE `/transactions/:id`** : Supprimer une transaction par son ID.
- **PUT `/transactions/:id`** : Modifier une transaction existante.

1. **Contrôleurs (Controllers)** : Les fonctions dans `controllers/transactions.js` permettent de gérer la logique métier pour chaque route :

- `getAllTransactions`: Récupérer toutes les transactions de la base de données.
- `addTransaction`: Ajouter une nouvelle transaction dans la base de données.
- `deleteTransaction`: Supprimer une transaction par ID.
- `updateTransaction`: Mettre à jour une transaction existante.

### **Frontend - Pages HTML** :

- **Ajout de transactions** : Formulaire permettant à l’utilisateur de saisir une nouvelle transaction.
- **Visualisation** : Graphiques générés avec Chart.js pour visualiser les dépenses et revenus.

------

## **6. Instructions d'installation et de déploiement**

1. **Cloner le projet :**

   ```bash
   git clone <url_du_projet>
   ```

2. **Installer les dépendances :** Dans le dossier du projet, exécuter la commande suivante pour installer toutes les dépendances nécessaires :

   ```bash
   npm install
   ```

3. **Lancer le serveur en mode développement** :

   ```bash
   npm run dev
   ```

4. **Accéder à l'application :** Ouvrir un navigateur et naviguer vers http://localhost:3000 pour accéder à l'application.

## **7. Diagrammes et Schémas**

**a. Diagramme de base de données (modèle Mongoose)** : Un diagramme UML ou une simple table peut être utilisé pour visualiser la structure de la base de données. Par exemple, un diagramme montrant le modèle `Transaction` avec les champs `type`, `categorie`, `montant`, et `date`.

**b. Diagrammes de flux d'interaction :** Des diagrammes montrant les interactions entre le client (frontend) et le serveur (API backend), ainsi que la gestion des requêtes HTTP, peuvent aider à comprendre l'architecture du projet.



## **8. Tests et Débogage**

### **a. Tests manuels**

Les tests manuels ont été effectués pour vérifier le bon fonctionnement des fonctionnalités principales de l’application, notamment :

- Ajouter, modifier, et supprimer des transactions.
- Vérifier la validité des graphiques (revenus et dépenses).

### **b. Tests unitaires** (si applicable)

Si tu as écrit des tests unitaires (par exemple avec Jest ou Mocha), il est important de mentionner ici comment les exécuter.



## **9. Problémes rencontrés**

1. **Erreur lors de la saisie de la transaction : **

   Source du problème : l'option `enum` dans le fichier `models/transactions` ne reconnaissait pas le type "revenue" comme valeur :

   ![cap-error-addtransac](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/cap-error-addtransac.png)

   > Note : <span style="color: red;">**Importance**</span> de bien configurer le code pour afficher les erreurs 
   >
   > ![Capture d’écran 2024-11-19 à 12.05.14](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/Capture d’écran 2024-11-19 à 12.05.14.png)

   Solution : j'ai élargi les valeurs acceptées par `enum` 

   ![cap-update-enum-option](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/cap-update-enum-option.png)

   > Note : j'ai modifié la valeur "revenue" en "revenu" pour correspondre à l'ortographe française 

2. **Erreur lors de la modification et suppression : **

   Source : l'`id` de la transaction n'est pas défini. Il est possible que j'ai mal configurer la requête PUT. 

   J'ai constaté que sous MongoDB, l'`id`  est stocké sous le nom `_id`. Or dans mon fichier je les mis sous cette forme `.id` .

   ![cap-error-transac-update](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/cap-error-transac-update.png)

   Cette erreur impactait également l'affichage du total des revenus au niveau du diagramme en barres pour la visualisation.

   Solution : J'ai simplement changé la forme de l'id en `_id` 

   ![cap-corr-error-req-transac](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/cap-corr-error-req-transac.png)

   Résultat : 

   PUT request ? OK

   ![cap-successful-put-req](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/cap-successful-put-req.png)

   DELETE request? OK

   ![cap-succesful-del-req](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/cap-succesful-del-req.png)

   



## **10. Conclusion et perspectives**

Ce projet offre une solution simple et intuitive pour la gestion des finances personnelles, avec une interface utilisateur graphique et une API backend bien structurée. Ce projet est, de base, à but personnel. Mais à l'avenir, des améliorations pour étendre son cas d'utilisation est possibles incluant :

- Ajout de comptes utilisateurs
- Ajouter une authentification pour gérer des comptes utilisateurs.
- Permettre la gestion des catégories de dépenses et leur personnalisation.
- Implémenter des rapports plus détaillés sur les finances.
- Intégrer une simulation de budget 
- Etc