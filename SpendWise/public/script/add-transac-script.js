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

    } catch (err) {
        console.error(err);
        const selectCategorie = document.getElementById('categorie');
        selectCategorie.innerHTML = '<option disabled>Erreur de chargement</option>';
    }
}

// Charger les catégories au changement du type
document.getElementById('type').addEventListener('change', loadCategories);

// Gérer l'ajout de la transaction
document.getElementById('transac-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const transaction = {
        type: document.getElementById('type').value,
        categorie: document.getElementById('categorie').value,
        description: document.getElementById('description').value,
        montant: parseFloat(document.getElementById('montant').value.replace(",", ".")),
        date: new Date()
    };

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

        // Réinitialiser le formulaire
        this.reset();

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
