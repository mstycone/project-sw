<h1><div style="text-align:center;">Cahier des Charges</div> </h1>

**Problématique :** Comment aider les utilisateurs à mieux comprendre et gérer leur budget en fonction de leurs revenus et dépenses, tout en leur offrant des outils de simulation et de prévision ? 

**Motivation : ** Initialement conçu dans un cadre personnel, ce projet a pour objectif de m'aider à mieux gérer et organiser mon budget de manière efficace.

### Simulation de budget personnel  

#### 1. **Contexte du projet**
   - **Présentation** : Le projet débute en tant qu'initiative personnel et consiste à développer un site web de simulation de budget personnel, permettant de gérer les finances (en premier lieu), de simuler différents scénarios budgétaires (à l'avenir) et d’atteindre des objectifs financiers. Et, possiblement, proposer des recommandations. 

     Dans la finalité, le projet sera étendu et adapté, à terme, pour une utilisation par un profil étudiant et, par la suite, potentiellement par des groupes spécifiques. 

   - **Cible(s)** : Initialement destiné à des adultes de tout âges souhaitant mieux gérer leur budget, comprendre leurs habitudes de consommation, ou épargner pour des projets futurs. 

     

#### 2. **Objectifs du projet**
   - **Objectif principal** : Aider les utilisateurs à mieux gérer leur budget en leur fournissant des outils simples et intuitifs pour suivre leurs dépenses et revenus.
   - **<span style="color: grey;">Objectifs secondaires</span>** (optionnel):
     - Offrir des simulations budgétaires pour aider à la prise de décision.
     - Éduquer les utilisateurs sur la gestion financière à travers des conseils et des recommandations personnalisées.
     - Fournir des alertes et des notifications pour aider à maintenir un équilibre financier.
     - Analyser les données de consommation pour identifier les tendances et les domaines d’amélioration.

#### 3. **Fonctionnalités**
   - **Page d'accueil** : L'utilisateur peut voir un résumé de ses transactions (revenus et dépenses) ainsi que le solde actuel de son compte.
   - **Ajout de transactions** : L'utilisateur pourra ajouter des transactions (comme des achats ou des revenus), en choisissant un type (dépense ou revenu) et une catégorie (loyer, alimentation, salaire, etc.).
   - **Tableau des transactions** : Une page affichant toutes les transactions sous forme de tableau, avec la possibilité de filtrer par type, catégorie, ou date.
   - **Graphiques de visualisation** :
     - Graphique en barres pour comparer les dépenses et les revenus.
     - Graphique circulaire pour montrer la répartition des différentes catégories de dépenses.
   - **Simulation budgétaire** : 
     - Outil de simulation pour tester différents scénarios (réduction des dépenses, augmentation des revenus).
     - Prévisions de solde pour différentes périodes (mensuel, trimestriel, annuel).

#### 4. **Design et ergonomie** 
   - **Interface utilisateur** : Simple et intuitive, adaptée aux utilisateurs novices en matière de gestion budgétaire.
     
   - **Responsive Design** : 
     - Compatible avec les appareils de bureau.
     - <span style="color: grey;">Compatible avec les appareils mobile</span> (optionnel).


<h4>5. Expérience utilisateur (UX/UI) :</h4>

#### a. **Simplicité d'utilisation**

   - Le processus d'entrée des revenus et des dépenses doit être simple et rapide. Par exemple, offrir des catégories prédéfinies.
   - Utiliser des visualisations claires pour que l'utilisateur comprenne en un coup d'œil ses finances (exemple : un graphique circulaire pour les dépenses par catégorie).

#### 6. **Technologies** 

Conformément à notre accord, le développeur est libre de choisir les outils qu'il jugera les plus adaptés pour la conception.

​	**Objectif finale:** Utilisation de la technologie MERN. 

   - **Front-end** : HTML/CSS/JS avec la possibilité de migrer vers React plus tard. 
   - **Back-end** : Utilisation de Node.js avec Express.js.
   - **Base de données** : MongoDB
   - **Hébergement** : En local (pour le moment).

#### 7. **Sécurité et confidentialité** 

   - Assurer la protection des informations que l'utilisateur entre dans l'application, comme ses transactions ou ses catégories de dépenses.
   - S'assurer que seuls les utilisateurs autorisés puissent accéder à leur compte en toute sécurité (une fois l'authentification implémentée). 
   - Les informations échangées entre l'utilisateur et le site doivent rester confidentielles et protégées. 
   - L'utilisateur pourra à tout moment supprimer de ses données ainsi que son compte. 

**Diagramme des Cas d'utilisations : ** 



<img src="/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/UseCasesDiagram_5.png" alt="use cases diagram" height="300">

> cf Excalidraw.com

**Dictionnaire de données : ** 

<img src="/Users/arnaudabou-bacar/Desktop/me/BTS SIO/2nd Year /Cours BTSIO2/Projets BTS SIO/Projet S3/Image_ProjetS3/Cap_DataDictionary2.png" alt="data dictionary" height="300">

> cf dbdiagram.io



<h4>8. Suggestions d'améliorations et modifications</h4>

   - Toutes suggestions d'améliorations, modifications ou ajouts de fonctionnalités, dans le cadre du projet, sont laissées à la libre initiative du développeur, sous réserve qu'elles respectent l'objectif général et la direction définie dans ce cahier des charges. Le développeur est encouragé à faire preuve de créativité et à proposer des ajustements qui pourraient améliorer l'expérience utilisateur ou la performance technique du projet.



