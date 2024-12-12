// Fonction pour charger et filtrer les catégories
function loadCategories() {
  const selectedType = document.getElementById('type').value; // Récupère le type sélectionné

  // Effectue une requête pour obtenir les catégories
  fetch('/categories')
      .then(response => response.json())
      .then(data => {
          // Filtre les catégories selon le type sélectionné
          const filteredCategories = data.filter(category =>
              (selectedType === 'revenu' && category.type === 'Revenu') ||
              (selectedType === 'dépense' && category.type === 'Dépense')
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
      })
      .catch(err => {
          console.error('Erreur lors de la récupération des catégories:', err);
          //En cas d'erreur, vider le <select> et afficher un message d'erreur
          const selectCategorie = document.getElementById('categorie');
          selectCategorie.innerHTML = '<option disabled>Erreur de chargement</option>';
      });
}

// Charger les catégories au changement du type
document.getElementById('type').addEventListener('change', loadCategories);

// Gérer l'ajout de la transaction
document.getElementById('transac-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Crée l'objet transaction
  const transaction = {
      type: document.getElementById('type').value,
      categorie: document.getElementById('categorie').value,
      description: document.getElementById('description').value,
      montant: parseFloat(document.getElementById('montant').value.replace(",", ".")),
      date: new Date()
  };

  // Envoie une requête POST pour sauvegarder la transaction
  fetch('/transactions', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout de la transaction');
      }
    })
    .then(data => {
        console.log('Transaction ajoutée avec succès :', data);

        // Réinitialise le formulaire
        this.reset();

        // Affiche un message de confirmation
        const feedback = document.getElementById('feedback');
        feedback.style.display = 'block';

        // Cacher le message après 3 secondes
        setTimeout(() => feedback.style.display = 'none', 3000);
    })
    //Ajout gestionnaire d'erreurs 
    .catch(err => {
        console.error('Erreur lors de l\'ajout de la transaction :', err);
        const feedback = document.getElementById('feedback');
        feedback.style.display = 'block';
        feedback.style.backgroundColor = 'red';
        feedback.textContent = err.message;
        setTimeout(() => feedback.style.display = 'none', 3000);
    });
});
