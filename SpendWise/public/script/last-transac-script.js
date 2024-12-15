document.addEventListener('DOMContentLoaded', async () => {
    
    const transactionsContainer = document.getElementById('dernieres-transactions');
    if (!transactionsContainer) {
        console.error('Container not found');
        return;
    }

    try {
        const response = await fetch('/transactions');
        if (!response.ok) throw new Error('Failed to fetch transactions');

        const transactions = await response.json();
        const lastFiveTransactions = transactions.slice(-5).reverse(); // Assure qu’on obtient les 5 dernières

        transactionsContainer.innerHTML = ''; // Clear previous content

        lastFiveTransactions.forEach(transaction => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('transaction');
            
            // Avoid innerHTML if needed for security
            transactionElement.innerHTML = `
                <p><strong>Description:</strong> ${transaction.description}</p>
                <p><strong>Montant:</strong> ${transaction.montant} €</p>
                <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleDateString()}</p>
            `;
            transactionsContainer.appendChild(transactionElement);
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        transactionsContainer.innerHTML = '<p>Erreur lors du chargement des transactions.</p>';
    }
});
