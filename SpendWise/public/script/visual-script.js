document.addEventListener("DOMContentLoaded", function() {
    // Récupérer les transactions depuis le backend avec fetch 
    fetch('/transactions')
    .then(response => response.json())
    .then(transactions => {
        // Initialiser les variables pour les dépenses et revenus
        let depenseTotal = 0;
        let revenueTotal = 0;
        // Initialiser un objet pour les dépenses par catégorie
        let categories = {};

        // Parcourir les transactions pour calculer les totaux
        transactions.forEach((transaction) => {
            if (transaction.type === "depense") {
                depenseTotal += parseFloat(transaction.montant);
                // Catégoriser les dépenses
                if (categories[transaction.categorie]) {
                    categories[transaction.categorie] += parseFloat(transaction.montant);
                } else {
                  categories[transaction.categorie] = parseFloat(transaction.montant);
              }
          } else if (transaction.type === "revenu") {
              revenueTotal += parseFloat(transaction.montant);
          }
        });

        // Configuration du diagramme de comparaison
        let ctx1 = document.getElementById('transactionChart').getContext('2d');
        let transactionChart = new Chart(ctx1, {
            type: 'bar', // Type de graphique
            data: {
                labels: ['Revenus', 'Dépenses'], // Légendes
                datasets: [{
                    label: 'Montant (€)',
                    data: [revenueTotal, depenseTotal], // Données à visualiser
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)', // Couleur pour les revenus
                        'rgba(255, 99, 132, 0.6)'  // Couleur pour les dépenses
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',    // Bordure pour les revenus
                        'rgba(255, 99, 132, 1)'     // Bordure pour les dépenses
                    ],
                    borderWidth: 1
                }]
            },
           options: {
                scales: {
                    y: {
                        beginAtZero: true // Le graphique commence à zéro
                    }
                },
               plugins: {
                    legend: {
                        display: true, // Afficher la légende
                        position: 'top'
                   },
                   title: {
                        display: true,
                        text: 'Visualisation des revenus et dépenses'
                    }
                }
            }
        });

        // Préparer les données pour le diagramme en cercle
        const expenseLabels = Object.keys(categories);
        const expenseData = Object.values(categories);

        // Configuration du diagramme en cercle
        let ctx2 = document.getElementById('expenseChart').getContext('2d');
        let expenseChart = new Chart(ctx2, {
            type: 'pie', // Type de graphique
            data: {
                labels: expenseLabels, // Catégories de dépenses
                datasets: [{
                    label: 'Dépenses par catégorie',
                    data: expenseData, // Données des dépenses par catégorie
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // Adaptation responsive
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Répartition des Dépenses'
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error(`Erreur lors de la récupération des données :, ${error}`);
    });
});