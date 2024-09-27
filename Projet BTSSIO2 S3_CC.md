**ABOU-BACAR Arnaud **



<h1><div style="text-align:center;">Cahier des Charges</div> </h1>

**Problématique :** Comment aider les utilisateurs à mieux comprendre et gérer leur budget en fonction de leurs revenus et dépenses, tout en leur offrant des outils de simulation et de prévision ? 

**Motivation : ** Initialement conçu dans un cadre personnel, ce projet a pour objectif de m'aider à mieux gérer et organiser mon budget de manière efficace

### Cahier des charges pour le site de simulation de budget personnel  

#### 1. **Contexte du projet**
   - **Présentation** : Le projet débute en tant qu'initiative personnel et consiste à développer un site web de simulation de budget personnel, permettant de gérer les finances, de simuler différents scénarios budgétaires et d’atteindre des objectifs financiers. Et, possiblement, proposer des recommandations. 

     Dans la finalité, le projet sera étendu et adapté, à terme, pour une utilisation par un profil étudiant et, par la suite, par des groupes spécifiques. 

   - **Cible(s)** : Initialement destiné à des adultes de tout âges souhaitant mieux gérer leur budget, comprendre leurs habitudes de consommation, ou épargner pour des projets futurs. 

     Le site pourra par la suite s'adresser à des étudiants souhaitant acquérir des compétences en gestion financière à des fins éducatives ou académiques.

#### 2. **Objectifs du projet**
   - **Objectif principal** : Aider les utilisateurs à mieux gérer leur budget en leur fournissant des outils simples et intuitifs pour suivre leurs dépenses et revenus.
   - **Objectifs secondaires** :
     - Offrir des simulations budgétaires pour aider à la prise de décision (optionnel).
     - Éduquer les utilisateurs sur la gestion financière à travers des conseils et des recommandations personnalisées (optionnel).
     - Fournir des alertes et des notifications pour aider à maintenir un équilibre financier (optionnel).
     - Analyser les données de consommation pour identifier les tendances et les domaines d’amélioration (optionnel).

#### 3. **Fonctionnalités**
   - **Inscription et authentification** :
     - Création d’un compte utilisateur.
     - Validation par email (optionnel)
     - Connexion et déconnexion sécurisées.
     
   - **Tableau de bord** :
     - Vue d’ensemble des finances : revenus, dépenses, solde.
     - Graphiques et statistiques sur les habitudes de consommation.

   - **Gestion des revenus et dépenses** : 
     - Ajout, modification et suppression de transactions (revenus et dépenses).
     - Catégorisation des dépenses (nourriture, loisirs, logement, etc.).
     - Définir les limites 
     
   - **Simulation budgétaire** : 
     - Outil de simulation pour tester différents scénarios (réduction des dépenses, augmentation des revenus).
     - Prévisions de solde pour différentes périodes (mensuel, trimestriel, annuel).

   - **Objectifs financiers** (optionnel):
     - Définition d’objectifs d’épargne (par exemple, vacances, achat d’une maison).
     - Suivi de la progression vers ces objectifs.

   - **Alertes et notifications** (optionnel):
     - Notifications de dépassement de budget par catégorie.
     - Rappels pour ajouter des transactions ou vérifier le budget.

   - **Éducation financière** (optionnel):
     - Articles et ressources éducatives sur la gestion financière.
     - Conseils personnalisés basés sur les données utilisateur.

#### 4. **Design et ergonomie** 
   - **Interface utilisateur** : Simple et intuitive, adaptée aux utilisateurs novices en matière de gestion budgétaire.
     - **HTML/CSS/JavaScript** 

   - **Responsive Design** : 
     - Compatible avec les appareils de bureau.
     - Compatible avec les appareils mobile (optionnel).


<h4>5. Expérience utilisateur (UX/UI) :</h4>

#### a. **Simplicité d'utilisation**

   - Le processus d'entrée des revenus et des dépenses doit être simple et rapide. Par exemple, offrir des catégories prédéfinies, et permettre l'importation des relevés bancaires pour automatiser l'entrée des transactions.
   - Utiliser des visualisations claires pour que l'utilisateur comprenne en un coup d'œil ses finances (exemple : un graphique circulaire pour les dépenses par catégorie).

#### 6. **Technologies** 

​	Utilisation de la technologie MERN. 

   - **Front-end** : React 
   - **Back-end** : Node.js avec Express pour l’API
   - **Base de données** : MongoDB
   - **Hébergement** : En local (pour le moment).

#### 7. **Sécurité et confidentialité** 

   - **Cryptage des données** : Sécuriser les informations financières des utilisateurs en utilisant des protocoles comme HTTPS et le cryptage des données sensibles.
   - **Connexion sécurisée** : Authentification forte (par exemple, authentification à deux facteurs) pour protéger les comptes des utilisateurs.
   - **Confidentialité des données** : Garantir que les données financières des utilisateurs ne sont pas partagées sans leur consentement.

**Diagramme des Cas d'utilisations : ** 



<img src="/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/UseCasesDiagram_4.png" alt="use cases diagram" height="500">

> cf Excalidraw.com

**Dictionnaire de données : ** 

<img src="/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/Cap_DataDictionary.png" alt="data dictionary" height="300">

> cf dbdiagram.io



<h4>8. Suggestions d'améliorations et modifications</h4>

   - Toutes suggestions d'améliorations, modifications ou ajouts de fonctionnalités, dans le cadre du projet, sont laissées à la libre initiative du développeur, sous réserve qu'elles respectent l'objectif général et la direction définie dans ce cahier des charges. Le développeur est encouragé à faire preuve de créativité et à proposer des ajustements qui pourraient améliorer l'expérience utilisateur ou la performance technique du projet.



