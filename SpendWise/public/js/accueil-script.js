document.addEventListener("DOMContentLoaded", async function () {
  try {
      const response = await fetch('/transactions'); // Récupérer les transactions
      const transactions = await response.json();

      const filterTransactions = (transactions) => {
        const today = dayjs().utc();//use UTC pour today date 
        console.log("Filtrage avec le filtre :", today.format('MM-YYYY'));  // Log du filtre utilisé
        
        return transactions.filter(transaction => 
          dayjs(transaction.date).utc().isSame(today, 'month'));
      };

      //Initialisation totaux
      let revenueTotal = 0;
      let depenseTotal = 0;

      let resRevenueTotal = 0;
      let resDepenseTotal = 0; 

      // Filtrer les transactions selon le filtre choisi
      const filteredTransactions = filterTransactions(transactions);

      /*Solde actuel*/
      // Calculer les totaux pour le solde 
      transactions.forEach(transaction => {
          if (transaction.type === 'revenu') {
              revenueTotal += transaction.montant;
          } else if (transaction.type === 'dépense') {
              depenseTotal += transaction.montant;
          }
      });

      /*Resume transactions sur le mois*/
      filteredTransactions.forEach(transaction => {
          if (transaction.type === 'revenu') {
              resRevenueTotal += transaction.montant;
          } else if (transaction.type === 'dépense') {
              resDepenseTotal += transaction.montant;
          }
      });

      // Calculer et styliser le solde
      const solde = revenueTotal - depenseTotal;
      const soldeElement = document.getElementById('solde');

      soldeElement.style.color = solde < 0 ? 'red' : solde === 0 ? 'grey' : '#28A745';
      soldeElement.textContent = `${parseFloat(solde.toFixed(2))} €`;

      // Mettre à jour les totaux dans le DOM
      document.getElementById('revenu-total').textContent = `${parseFloat(resRevenueTotal.toFixed(2))} €`;
      document.getElementById('revenu-total').style.color = '#28A745';
      document.getElementById('depense-total').textContent = `${parseFloat(resDepenseTotal.toFixed(2))} €`;
      document.getElementById('depense-total').style.color = '#DC3545';
  } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
  }
});

const button = document.getElementById('see-transac');
    button.addEventListener('click', () => {
      window.location.href = '../transac.html';
    });
