// Fonction pour charger et filtrer les catégories
async function loadCategories() {
  const selectedType = document.getElementById('type').value;

  try {
      const response = await fetch('/categories');
      if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
      }

      const data = await response.json();

      // Filtrer les catégories selon le type sélectionné
      const filteredCategories = data.filter(category =>
          (selectedType === 'revenu' && category.type === 'revenu') ||
          (selectedType === 'dépense' && category.type === 'dépense')
      );

      const selectCategorie = document.getElementById('categorie');
      selectCategorie.innerHTML = ''; // Vider le contenu du select

      // Ajouter une option par défaut
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = '-- Choisir la catégorie --';
      defaultOption.disabled = true;
      defaultOption.selected = true;
      selectCategorie.appendChild(defaultOption);

      // Ajouter les catégories filtrées au select
      filteredCategories.forEach(category => {
          const option = document.createElement('option');
          option.value = category._id;
          option.textContent = category.name;
          selectCategorie.appendChild(option);
      });

  } catch (err) {
      console.error(err);
      const selectCategorie = document.getElementById('categorie');
      selectCategorie.innerHTML = '<option disabled>Erreur de chargement</option>';
  }
}

const selectCategorie = document.getElementById('categorie');
const selectType = document.getElementById('type');

// Charger les catégories au changement du type
selectType.addEventListener('change', () => {
    loadCategories();
    // Désactiver le sélecteur de catégorie si aucun type n'est sélectionné
    selectCategorie.disabled = selectType.value === '';
});

// Gérer l'ajout de la transaction
document.getElementById('transac-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Empêche le rechargement de la page

  const transaction = {
      type: document.getElementById('type').value,
      categorie: document.getElementById('categorie').options[document.getElementById('categorie').selectedIndex].text,
      description: document.getElementById('description').value,
      montant: parseFloat(document.getElementById('montant').value.replace(",", ".")),
      date: new Date()
  };

  console.log('Transaction avant envoi :', transaction);

  try {
      const response = await fetch('/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction)
      });

      if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout de la transaction');
      }

      const data = await response.json();
      console.log('Transaction ajoutée avec succès :', data);

      // Mettre à jour le solde, le revenu et les dépenses
      const formattedBalance = parseFloat(data.currentBalance.toFixed(2));
      document.getElementById('solde').textContent = `${formattedBalance} €`;
      document.getElementById('solde').style.color = data.currentBalance < 0 ? 'red' : data.currentBalance === 0 ? 'grey' : '#28A745';
      document.getElementById('revenu-total').textContent = `${parseFloat(data.totalIncome.toFixed(2))} €`;
      document.getElementById('depense-total').textContent = `${parseFloat(data.totalExpense.toFixed(2))} €`;

      // Mettre à jour les transactions récentes
      const recentTransactionsContainer = document.getElementById('dernieres-transactions');
      const transactionItem = document.createElement('li');
      transactionItem.classList.add('transaction-item');
      const typeClass = transaction.type === 'revenu' ? 'revenu' : 'depense';
      transactionItem.innerHTML = `
            <div class="transaction-details">
                <span class="transaction-category">${transaction.categorie}</span>
                <span class="transaction-description">${transaction.description}</span>
                <span class="transaction-date">${new Date(transaction.date).toLocaleDateString()}</span>
            </div>
            <div class="transaction-amount ${typeClass}">${transaction.montant} €</div>
        `;
      recentTransactionsContainer.insertBefore(transactionItem, recentTransactionsContainer.firstChild); // Insérer en haut

      //Effacer message "Aucune transaction" lors submit une transaction
      const noTransactionMessage = document.getElementById("no-transaction");
      if (noTransactionMessage){
        noTransactionMessage.style.display = "none";
      }

      // Limiter à 5 transactions récentes
      const transactions = recentTransactionsContainer.children;
      if (transactions.length > 5) {
          recentTransactionsContainer.removeChild(transactions[transactions.length - 1]); // Supprimer la plus ancienne
      }

      // Réinitialiser le formulaire
      this.reset(); 
      
      // Réinitialiser le champ de catégorie à la valeur par défaut
      const selectCategorie = document.getElementById('categorie');
      selectCategorie.value = ''; // Réinitialiser à la valeur par défaut
      selectCategorie.disabled = selectCategorie.value === '';

      // Afficher un message de confirmation
      const feedback = document.getElementById('feedback');
      feedback.style.display = 'block';
      feedback.style.backgroundColor = 'green';
      feedback.textContent = 'Transaction ajoutée avec succès !';

      // Cacher le message après 3 secondes
      setTimeout(() => feedback.style.display = 'none', 3000);

  } catch (err) {
      console.error(err);
      const feedback = document.getElementById('feedback');
      feedback.style.display = 'block';
      feedback.style.backgroundColor = 'red';
      feedback.textContent = err.message;
      setTimeout(() => feedback.style.display = 'none', 3000);
  }
});
