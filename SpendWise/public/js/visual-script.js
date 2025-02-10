document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('/transactions');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des transactions');
        }
        const transactions = await response.json();

        // Initialiser les variables pour les dépenses et revenus
        let depenseTotal = 0;
        let revenueTotal = 0;
        let categories = {};

        // Parcourir les transactions pour calculer les totaux
        transactions.forEach((transaction) => {
            if (transaction.type === "dépense") {
                depenseTotal += parseFloat(transaction.montant);
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
        const ctx1 = document.getElementById('transactionChart').getContext('2d');
        const transactionChart = new Chart(ctx1, {
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

        // Préparer les données pour le diagramme en cercle
        const expenseLabels = Object.keys(categories);
        const expenseData = Object.values(categories);

        // Configuration du diagramme en cercle
        const ctx2 = document.getElementById('expenseChart').getContext('2d');
        const expenseChart = new Chart(ctx2, {
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
                    borderWidth: 1
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
                        text: 'Répartition des Dépenses',
                        color: '#ff5722'
                    }
                }
            }
        });
    } catch (error) {
        console.error(`Erreur lors de la récupération des données : ${error}`);
        alert('Une erreur est survenue lors du chargement des données.');
    }
});
