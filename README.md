<h1 style="text-align: center;">SpendWise</h1>



## Description

**SpendWise** est une application web qui permet à l'utilisateur de gérer ses dépenses et ses revenus. L'application permet à l'utilisateur de :

- Ajouter, modifier et supprimer des transactions.
- Visualiser des graphiques sur les dépenses et les revenus dans un format simple et intuitif.
- Organiser les transactions en catégories et obtenir un aperçu de la répartition des dépenses.

Cette application est construite avec **Node.js**, **Express**, **MongoDB** pour la gestion des données, et **Chart.js** pour la visualisation graphique.

## Fonctionnalités

- **Gestion des transactions** : Ajout, suppression, mise à jour des transactions.
- **Graphiques interactifs** : Visualisation des dépenses et des revenus à l'aide de graphiques en barres et en camembert.
- **Stockage des données** : Les transactions sont stockées dans une base de données MongoDB locale.

## Technologies utilisées

- **Frontend** :
  - HTML5, CSS3
  - JavaScript (Vanilla JS)
  - Chart.js pour la visualisation des graphiques
- **Backend** :
  - Node.js avec Express
  - MongoDB pour le stockage des données

## Prérequis

Avant de pouvoir exécuter ce projet, assurez-vous que vous avez les éléments suivants installés sur votre machine :

- **Node.js** (version 14 ou supérieure)
- **MongoDB** (version 4.x ou supérieure) – si vous utilisez une base de données locale

## Installation

1. **Cloner le projet** :

   Si ce n'est pas déjà fait, clonez le projet sur votre machine locale.

   ```bash
   git clone https://github.com/votre-utilisateur/spendwise.git
   ```

2. **Naviguer dans le dossier du projet** :

   ```bash
   cd spendwise
   ```

3. **Installer les dépendances** :

   Utilisez `npm` pour installer toutes les dépendances nécessaires.

   ```bash
   npm install
   ```

4. **Configurer MongoDB** :

   Si vous utilisez une instance locale de MongoDB, assurez-vous qu'elle soit en cours d'exécution. Si vous préférez utiliser une base de données MongoDB Atlas ou autre, vous devrez modifier le fichier de configuration (par exemple, `.env`) avec l'URL de connexion.

5. **Démarrer le serveur** :

   Pour démarrer le serveur en mode développement (avec `nodemon`), utilisez la commande suivante :

   ```bash
   npm run dev
   ```

   Votre application sera alors disponible à l'adresse http://localhost:3000.

## Utilisation

1. **Ajouter une transaction** :

   Allez dans la section "Ajouter une transaction" de l'application, entrez les détails de la transaction (type, catégorie, montant) et soumettez le formulaire.

2. **Voir les transactions** :

   Vous pouvez consulter toutes vos transactions dans la section "Voir les transactions". Vous y verrez une liste de vos transactions avec des options pour les modifier ou les supprimer.

3. **Visualiser les graphiques** :

   Dans la section "Visualisation", vous pouvez voir un graphique comparant vos dépenses et revenus, ainsi qu'un graphique circulaire montrant la répartition des dépenses par catégorie.

## Routes API

Le backend de l'application expose les routes suivantes :

- **GET /transactions** : Récupère toutes les transactions.
- **POST /transactions** : Ajoute une nouvelle transaction.
- **DELETE /transactions**: Supprime une transaction par son identifiant.
- **PUT /transactions**: Modifie une transaction existante par son identifiant.

## Structure du projet

Voici la structure des fichiers du projet :

```
spendwise/
│
├── controllers/  # Contient la logique des routes (ajouter, modifier, etc.)
│   └── transactions.js
│
├── models/  # Définit les schémas Mongoose pour la base de données
│   └── transactions.js
│
├── routes/  # Définit les routes pour les transactions
│   └── transactions.js
│
├── public/  # Contient les fichiers statiques (HTML, CSS, JS)
│   ├── index.html
│   ├── add-transac.html
│   └── visualisation.html
│
├── app.js   			# Le fichier principal du serveur
├── package.json  # Dépendances du projet
└── .gitignore    # Liste des fichiers à ignorer par Git
```

## Captures d'écran

Ajoutez des captures d'écran pertinentes pour illustrer les fonctionnalités clés de l'application. Par exemple :

1. **Page d'accueil (index.html)** :

   ![cap-accueil](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Wireframe_Projet S3/cap-accueil.png)

2. **Ajouter une transaction (add-transac.html)** :

   ![cap-add-transaction](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Wireframe_Projet S3/cap-add-transaction.png)

3. **Voir les transactions (transac.html)** :

   ![cap-transaction](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Wireframe_Projet S3/cap-transaction.png)

4. **Visualisation des graphiques (visualisation.html)** :

   ![cap-visualisation](/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Wireframe_Projet S3/cap-visualisation.png)

   