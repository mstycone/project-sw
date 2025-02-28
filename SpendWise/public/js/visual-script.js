document.addEventListener("DOMContentLoaded", async function () {
    
    const filterSelect = document.getElementById("periodfilter");
  
    let transactionChart, expenseChart; // Stocker les graphiques pour éviter les doublons
    
    const fetchCategories = async (filter) => {
        console.log("Récupération des top catégories avec filtre :", filter);
        try {
            const response = await fetch(`/categories?top=true&filter=${filter}`);
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
        console.log("Récupération des transactions avec le filtre: ", filter);
        try {

            // Exécuter les requêtes en parallèle
            const [transactionsResponse, topCategories] = await Promise.all([
                fetch(`/transactions?all=true&filter=${filter}`),
                fetchCategories(filter) //Ajout filtre 
            ]);

            if (!transactionsResponse.ok) {
                throw new Error('Erreur lors de la récupération des transactions');
            }
            const data = await transactionsResponse.json();
            const transactions = data.transactions; //Accès à la propriété transactions 

            //Vérification si transactions = tableau 
            if (!Array.isArray(transactions)) {
                console.error("transactions n'est pas un tableau :", transactions);
                return;
            }

            // Initialiser les variables pour les dépenses et revenus
            let depenseTotal = 0;
            let revenueTotal = 0;

            // Parcourir les transactions pour calculer les totaux
            transactions.forEach((transaction) => {
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
                            labels: {
                                font:{
                                    size: 15,
                                },
                            }
                        },
                        title: {
                            display: true,
                            text: 'Visualisation des revenus et dépenses',
                            color: '#ff5722',
                            font:{
                                size: 18,
                                weight: 'bold'
                            }
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
                            position: 'top',
                            labels: {
                                font:{
                                    size: 15,
                                },
                            }
                        },
                        title: {
                            display: true,
                            text: 'Visualisation des dépenses majeurs ',
                            color: '#ff5722',
                            font:{
                                size: 18,
                                weight: 'bold'
                            },
                        }
                    }
                }
            });
        } catch (error) {
            console.error(`Erreur lors de la récupération des données : ${error}`);
            alert('Une erreur est survenue lors du chargement des données.');
        }
    };

    //Récupérer les transactions dès que l'utilisateur sélectionne un filtre
    filterSelect.addEventListener("change", (e) => {
        const selectedFilter = e.target.value;
        fetchTransactions(selectedFilter);// Filtrer selon la sélection de l'utilisateur
    });

    //Charger les transactions au démarrage 
    fetchTransactions('currentMonth');
});
