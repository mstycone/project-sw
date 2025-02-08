document.addEventListener('DOMContentLoaded', async () => {
    
    const transactionsContainer = document.getElementById('dernieres-transactions');
    if (!transactionsContainer) {
        console.error('Container est introuvable!');
        return;
    }

    try {
        const response = await fetch('/transactions');
        if (!response.ok) throw new Error('Erreur lors de la récupération des transactions');

        const transactions = await response.json();
        const lastFiveTransactions = transactions.slice(-5).reverse(); // Assure qu’on obtient les 5 dernières

        transactionsContainer.innerHTML = ''; // Efface le contenu précédent

        if (lastFiveTransactions.length === 0) {
            const noTransactionMessage = document.createElement('li');
            noTransactionMessage.textContent = 'Aucune transaction à afficher';
            noTransactionMessage.setAttribute("id", "no-transaction"); //Spécifier id pour l'affichage direct cf add-transac-script
            noTransactionMessage.style.fontWeight = 'bold';
            noTransactionMessage.style.color = 'gray';
            noTransactionMessage.style.padding = '10px 0';
            transactionsContainer.appendChild(noTransactionMessage);
            return; // Sortir de la fonction si aucune transaction
        }

        lastFiveTransactions.forEach(transaction => {
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
                </div>
                <div class="transaction-amount ${typeClass}">${transaction.montant} €</div>
            `;
            transactionsContainer.appendChild(transactionItem);
        });
        
        console.log('Transactions reçues:', lastFiveTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        transactionsContainer.innerHTML = '<p>Erreur lors du chargement des transactions.</p>';
    }
});
