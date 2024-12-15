document.addEventListener("DOMContentLoaded", async function () {
  try {
      const response = await fetch('/transactions'); // Récupérer les transactions
      const transactions = await response.json();

      let revenueTotal = 0;
      let depenseTotal = 0;

      // Calculer les totaux des revenus et des dépenses
      transactions.forEach(transaction => {
          if (transaction.type === 'revenu') {
              revenueTotal += transaction.montant;
          } else if (transaction.type === 'dépense') {
              depenseTotal += transaction.montant;
          }
      });

      // Calculer et styliser le solde
      const solde = revenueTotal - depenseTotal;
      const soldeElement = document.getElementById('solde');
      soldeElement.style.color = solde < 0 ? 'red' : solde === 0 ? 'grey' : '#28A745';
      soldeElement.textContent = `${parseFloat(solde.toFixed(2))} €`;

      // Mettre à jour les totaux dans le DOM
      document.getElementById('revenu-total').textContent = `${parseFloat(revenueTotal.toFixed(2))} €`;
      document.getElementById('revenu-total').style.color = '#28A745';
      document.getElementById('depense-total').textContent = `${parseFloat(depenseTotal.toFixed(2))} €`;
      document.getElementById('depense-total').style.color = '#DC3545';
  } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
  }
});
