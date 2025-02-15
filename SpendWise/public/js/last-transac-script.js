document.addEventListener('DOMContentLoaded', async () => {
    
    const transactionsContainer = document.getElementById('dernieres-transactions');
    if (!transactionsContainer) {
        console.error('Container est introuvable!');
        return;
    }

    try {
        const response = await fetch('/transactions/last-5');
        if (!response.ok) throw new Error('Erreur lors de la récupération des last 5 transactions');

        const transactions = await response.json();
        transactionsContainer.innerHTML = ''; // Efface le contenu précédent

        if (transactions.length === 0) {
            const noTransactionMessage = document.createElement('li');
            noTransactionMessage.setAttribute("id", "no-transaction"); //Spécifier pour l'affichage direct cf add-transac-script
            noTransactionMessage.textContent = 'Aucune transaction à afficher';
            transactionsContainer.appendChild(noTransactionMessage);
            return; // Sortir de la fonction si aucune transaction
        }

        transactions.forEach(transaction => {
            const transactionItem = document.createElement('li');
            transactionItem.classList.add('transaction-item');
            const typeClass = transaction.type === 'revenu' ? 'revenu' : 'depense';
            
            // Nouvelle façon d'accéder au nom de la catégorie
            //const categoryName = transaction.categorie?.name; => source problème d'affichage 
            //transaction.categorie suffit à afficher la catégotie 
            
            transactionItem.innerHTML = `
                <div class="transaction-details">
                    <span class="transaction-category">${transaction.categorie}</span> 
                    <span class="transaction-description">${transaction.description}</span>
                    <span class="transaction-date">${new Date(transaction.date).toLocaleDateString()}</span>
                    <span class="transaction-amount ${typeClass}">${transaction.montant} €</span>
                </div>
            `;
            transactionsContainer.appendChild(transactionItem);
        });
        
        console.log('Transactions reçues:', transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        transactionsContainer.innerHTML = '<p>Erreur lors du chargement des transactions.</p>';
    }
});
