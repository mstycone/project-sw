document.addEventListener('DOMContentLoaded',()=>{
    const typeSelect = document.getElementById('type');
    const categorySelect = document.getElementById('categorie');
    const addCategoryButton = document.getElementById('add-category');

    //Charge le type de transaction précédemment sélectionné 
    //Problème garde la sélection malgré le rechargement de la page
    /*
    const savedType = localStorage.getItem('selectedType');
    if (savedType){
        typeSelect.value = savedType;
    }*/ 

    //Sauvergader le type de transaction dans le localStorage à chaque changement 
    typeSelect.addEventListener('change',()=>{
        localStorage.setItem('selectedType',typeSelect.value);
    });

    addCategoryButton.addEventListener('click', ()=>{
        const newCategory = prompt('Entrez le nom de la nouvelle catégorie');

        if (newCategory && newCategory.trim() !== ''){
            const newOption = document.createElement('option');
            newOption.value = newCategory;
            newOption.textContent = newCategory;

            //Ajouter la nouvelle catégorie au select 
            categorySelect.appendChild(newOption);
            alert('Nouvelle catégorie ajoutée avec succès!');

            //On conserve le type de transaction sélectionné précédemment 
            const selectedType = typeSelect.value;
            localStorage.setItem('selectedType',selectedType);

            //Re-sélectionné le type de transaction pour maintenir l'affichage correct
            typeSelect.value = selectedType;

            // Mettre à jour le formulaire pour afficher la nouvelle catégorie
            // Assurez-vous que la nouvelle catégorie est sélectionnée dans le formulaire
            categorySelect.value = newCategory;
        } else {
            alert('Veuillez entrer un nom de catégorie valide!');
        }
    })
});