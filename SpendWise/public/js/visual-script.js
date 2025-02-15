document.addEventListener("DOMContentLoaded", async function () {
    
    const filterSelect = document.getElementById("periodfilter");
  
    let transactionChart, expenseChart; // Stocker les graphiques pour éviter les doublons

    // Fonction de filtrage des transactions
    const filterTransactions = (transactions, filter  = 'currentMonth') => {
      const today = dayjs().utc();//use UTC pour today date 
      console.log("Filtrage avec le filtre :", filter);  // Log du filtre utilisé

      switch (filter) {
        case 'last7days':
          return transactions.filter(transaction =>
            dayjs(transaction.date).utc().isAfter(today.subtract(7, 'days')) //Compare en UTC
          );
        case 'last30days':
          return transactions.filter(transaction =>
            dayjs(transaction.date).utc().isAfter(today.subtract(30, 'days'))
          );
        case 'currentMonth':
          return transactions.filter(transaction =>
            dayjs(transaction.date).utc().isSame(today, 'month')
          );
        case 'currentYear':
          return transactions.filter(transaction =>
            dayjs(transaction.date).utc().isSame(today, 'year')
          );
        default:
          return transactions;
      }
    };

    
    const fetchCategories = async () => {
        console.log("Récupération du top5 catégories et autres ...");
        try {
            const response = await fetch('/categories/top5');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des transactions');
            }
            const categories = await response.json();

            return categories.map(cat => ({
                name: cat.name === "Autres" ? "Autres" : cat.name, // Vérifier si c'est "Autres"
                total: cat.total
            }));

            } catch (error) {
                console.error(`Erreur lors de la récupération des catégories: ${error}`);
                alert('Une erreur est survenue lors du chargement des catégories.');
                return []; //Tableau vide cas erreur
        }
    }

    const fetchTransactions = async (filter) => {
        console.log("Récupération des transactions...");
        try {

            // Exécuter les requêtes en parallèle
            const [transactionsResponse, topCategories] = await Promise.all([
                fetch('/transactions'),
                fetchCategories()
            ]);
            if (!transactionsResponse.ok) {
                throw new Error('Erreur lors de la récupération des transactions');
            }
            const transactions = await transactionsResponse.json();

            // Filtrer les transactions selon le filtre choisi
            const filteredTransactions = filterTransactions(transactions, filter);
            console.log("Transactions filtrées :", filteredTransactions);

            // Initialiser les variables pour les dépenses et revenus
            let depenseTotal = 0;
            let revenueTotal = 0;

            // Parcourir les transactions pour calculer les totaux
            filteredTransactions.forEach((transaction) => {
                if (transaction.type === "dépense") {
                    depenseTotal += parseFloat(transaction.montant);
                   // if (categories[transaction.categorie]) {
                    //    categories[transaction.categorie] += parseFloat(transaction.montant);
                    //} else {
                    //   categories[transaction.categorie] = parseFloat(transaction.montant);
                    //}
                } else if (transaction.type === "revenu") {
                    revenueTotal += parseFloat(transaction.montant);
                }
            });

            // Détruire les anciens graphiques s'ils existent
            if (transactionChart) transactionChart.destroy();
            if (expenseChart) expenseChart.destroy();

            // Configuration du diagramme de comparaison
            const ctx1 = document.getElementById('transactionChart').getContext('2d');
            transactionChart = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: ['Revenus', 'Dépenses'],
                    datasets: [{
                        label: 'Montant (€)',
                        data: [revenueTotal, depenseTotal],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 0.5
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Visualisation des revenus et dépenses',
                            color: '#ff5722'
                        }
                    }
                }
            });

            topCategories.forEach(category => {
                console.log("Nom de la catégorie:", category.name);
                console.log("Total:", category.total);
              });

            // Préparer les données pour le diagramme en cercle
            //const expenseLabels = Object.keys(topCategories.name);
            //const expenseData = Object.values(topCategories.total);
            const expenseLabels = topCategories.map(category => category.name);
            const expenseData = topCategories.map(category => category.total);

            // Configuration du diagramme en cercle
            const ctx2 = document.getElementById('expenseChart').getContext('2d');
            expenseChart = new Chart(ctx2, {
                type: 'pie',
                data: {
                    labels: expenseLabels,
                    datasets: [{
                        label: 'Dépenses par catégorie',
                        data: expenseData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                        ],
                        borderWidth: 0.5
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Visualisation des dépenses majeurs ',
                            color: '#ff5722'
                        }
                    }
                }
            });
        } catch (error) {
            console.error(`Erreur lors de la récupération des données : ${error}`);
            alert('Une erreur est survenue lors du chargement des données.');
        }
    };

    // Appliquer le filtrage au changement du select
    filterSelect.addEventListener("change", () => {
        fetchTransactions(filterSelect.value || 'currentMonth');
    });

    //Charger les transactions au démarrage 
    fetchTransactions(filterSelect.value || 'currentMonth');
});
