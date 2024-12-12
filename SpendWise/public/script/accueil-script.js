//Utilisation backend et bdd pour les données 
document.addEventListener("DOMContentLoaded", function() {
    fetch('/transactions')  // Récupérer toutes les transactions depuis le backend
      .then(response => response.json())
      .then(transactions => {
        let revenueTotal = 0;
        let depenseTotal = 0;


        // Calculer les totaux des revenus et dépenses
        transactions.forEach(transaction => {
          if (transaction.type === 'revenu') {
              revenueTotal += transaction.montant;
          } else if (transaction.type === 'dépense') {
              depenseTotal += transaction.montant;
          }
        });

        // Calculer le solde
        const solde = revenueTotal - depenseTotal;
        if (solde<0){
          document.getElementById('solde').style.color = 'red';
        } else if (solde===0) {
          document.getElementById('solde').style.color = 'grey';
        } else {
          document.getElementById('solde').style.color = '#28A745'; //vert
        }


        //Arrondir le solde à 2 chiffres après la virgule
        const soldeVirgule = parseFloat(solde.toFixed(2));

        // Mettre à jour le DOM
        document.getElementById('solde').textContent = `${soldeVirgule} €`;
        document.getElementById('revenu-total').textContent = `${revenueTotal.toFixed(2)} €`;
        document.getElementById('depense-total').textContent = `${depenseTotal.toFixed(2)} €`;
      });
});
