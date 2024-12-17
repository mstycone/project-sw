# SpendWise

## Introduction
**SpendWise** est une application web conçue pour aider les utilisateurs à gérer leurs finances personnelles. Elle permet de suivre les revenus et les dépenses, d'analyser les habitudes de consommation, et de prendre des décisions éclairées pour un meilleur contrôle budgétaire. L'application est destinée à toute personne souhaitant améliorer sa gestion financière, qu'il s'agisse d'étudiants, de jeunes professionnels ou de familles.

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
- **Alertes et notifications** : Avertir les utilisateurs lorsqu'ils dépassent leur budget.

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
   Si ce n'est pas déjà fait, clonez le projet sur votre machine.
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
├── controllers/ 
├── models/  
├── routes/  
├── public/
│   ├── script/
│   ├── style-sw/
│   ├── index.html
│   ├── add-transac.html
│   └── visualisation.html
├── app.js 
├── package-lock.json   			
├── package.json  
└── .gitignore    
```

## Aperçu 
Voici un aperçu de l'application :
1. **Page d'introduction** : 
   <img src="./Wireframe_Projet S3/cap-intro.png">
   
2. **Page d'accueil (index.html)** :
   <img src="./Wireframe_Projet S3/cap-accueil-pt1.png">
   
3. **Voir les transactions (transac.html)** :
   1. Tableau des transactions : 
   <img src="./Wireframe_Projet S3/cap-transaction-new.png">
   2. Vue de la modification d'une transaction : 
   <img src="./Wireframe_Projet S3/cap-transaction-modif.png">
   3. Vue de la modification de la date d'une transaction : 
   <img src="./Wireframe_Projet S3/cap-transaction-exemple-modif-date.png">   

4. **Visualisation des graphiques (visualisation.html)** :
   <img src="./Wireframe_Projet S3/cap-visualisation-new.png">

## Contributions
Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :
1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b feature/YourFeature`).
3. Apportez vos modifications et validez-les (`git commit -m 'Add some feature'`).
4. Poussez vers la branche (`git push origin feature/YourFeature`).
5. Ouvrez une Pull Request.

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
