//alert("Coucou");

document.addEventListener("DOMContentLoaded", async () => {
    const filterSelect = document.getElementById("periodfilter");

    // Fonction de filtrage des transactions
    /*
    const filterTransactions = (transactions, filter = 'currentMonth') => {
      const today = dayjs().utc();//use UTC pour today date 
      console.log("Filtrage avec le filtre :", filter);  // Log du filtre utilisé

      switch (filter) {
        case 'last7days':
          return transactions.filter(transaction =>
            dayjs(transaction.date).utc().isAfter(today.subtract(7, 'days')) //Compare en UTC
          );
        case 'last30days':
          return transactions.filter(transaction =>
            dayjs(transaction.date).utc().isAfter(today.subtract(30, 'days'))
          );
        case 'currentMonth':
          return transactions.filter(transaction =>
            dayjs(transaction.date).utc().isSame(today, 'month')
          );
        case 'currentYear':
          return transactions.filter(transaction =>
            dayjs(transaction.date).utc().isSame(today, 'year')
          );
        default:
          return transactions;
      }
    };*/
  
    const fetchTransactions = async (filter) => {
      console.log("Récupération des transactions avec le filtre :", filter);
      try {
        const response = await fetch(`/transactions/filter-transac?filter=${filter}`); //Interpolation chaine avec ${filter}
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const transactions = await response.json();
        console.log("Transactions récupérées :", transactions);  // Log des transactions
  
        let transacList = document.getElementById("transac-list");
        if (!transacList) {
          console.error('Elément #transac-list introuvable');
          return;
        }

        transacList.innerHTML = ''; //Effacer ex transactions
  
        const displayEmptyMessage = () => {
          let emptyRow = document.createElement("tr");
          let emptyCell = document.createElement("td");
          emptyCell.setAttribute("colspan", 6); // Fusionne les colonnes
          emptyCell.setAttribute("class", "cell-vide");
          emptyCell.textContent = "Aucune transaction à afficher";
          emptyRow.appendChild(emptyCell);
          transacList.appendChild(emptyRow);
        };
  
        /* Filtrer les transactions selon le filtre choisi
        const filteredTransactions = filterTransactions(transactions, filter);
        console.log("Transactions filtrées :", filteredTransactions); Log des transactions après filtrage  */
  
        if (transactions.length === 0) {
          displayEmptyMessage();
        } else {
          transacList.innerHTML = ''; // Effacer les anciennes lignes
          transactions.forEach((transaction, index) => {
            let row = document.createElement("tr");
  
            //Récupération données 

            /*Gestion affichage*/
            
            // Catégorie
            let catCell = document.createElement("td");
            catCell.textContent = transaction.categorie;
            row.appendChild(catCell);
  
            // Description
            let descCell = document.createElement("td");
            descCell.textContent = transaction.description;
            row.appendChild(descCell);
  
            // Montant
            let montantCell = document.createElement("td");
            montantCell.textContent = parseFloat(transaction.montant.toFixed(2)) + " €";
            row.appendChild(montantCell);
  
            // Type
            let typeCell = document.createElement("td");
            typeCell.textContent = transaction.type;
            row.appendChild(typeCell);
  
            // Date
            let dateCell = document.createElement("td");
            dateCell.textContent = dayjs(transaction.date).local().format('DD/MM/YYYY');
            row.appendChild(dateCell);
  
            /*Gestion des transactions*/

            // Boutons modifier et supprimer
            let actionCell = document.createElement("td");
  
            let editBtn = document.createElement("button");
            editBtn.setAttribute("class", "button-add-transac");
            editBtn.textContent = "Modifier";
            editBtn.addEventListener("click", () => {
              // Modifier la transaction
              catCell.innerHTML = `<input type="text" value="${transaction.categorie}" id="edit-categorie-${index}">`;
              descCell.innerHTML = `<input type="text" value="${transaction.description}" id="edit-description-${index}">`;
              montantCell.innerHTML = `<input type="number" min="0" step="0.01" value="${transaction.montant}" id="edit-montant-${index}">`;
              typeCell.innerHTML = `
                <select id="edit-type-${index}">
                  <option value="revenu" ${transaction.type.toLowerCase() === 'revenu' ? 'selected' : ''}>Revenu</option>
                  <option value="dépense" ${transaction.type.toLowerCase() === 'dépense' ? 'selected' : ''}>Dépense</option>
                </select>`;
              dateCell.innerHTML = `<input type="date" id="edit-date-${index}" value="${dayjs(transaction.date).format('YYYY-MM-DD')}">`;
  
              // Remplacer le bouton Modifier par un bouton Sauvegarder
              editBtn.style.display = "none";
              let saveBtn = document.createElement("button");
              saveBtn.setAttribute("class", "button-add-transac");
              saveBtn.textContent = "Sauvegarder";
              actionCell.appendChild(saveBtn);
  
              saveBtn.addEventListener("click", () => {
                if (confirm("Voulez-vous sauvegarder les modifications ?")) {
                  const updatedTransaction = {
                    categorie: document.getElementById(`edit-categorie-${index}`).value,
                    description: document.getElementById(`edit-description-${index}`).value,
                    montant: parseFloat(document.getElementById(`edit-montant-${index}`).value),
                    type: document.getElementById(`edit-type-${index}`).value,
                    date: dayjs(document.getElementById(`edit-date-${index}`).value).local().format(), 
                  };
  
                  alert("date saved : " + updatedTransaction.date);
                  // Envoi de la requête PUT pour modifier les transactions
                  fetch(`/transactions/${transaction._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedTransaction)
                  })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(`Erreur lors de l'update de la transaction : ${response.statusText}`);
                    }
                    return response.json();
                  })
                  .then(() => {
                    // Mettre à jour l'affichage de la transaction
                    catCell.textContent = updatedTransaction.categorie;
                    descCell.textContent = updatedTransaction.description;
                    montantCell.textContent = parseFloat(updatedTransaction.montant.toFixed(2)) + " €";
                    typeCell.textContent = updatedTransaction.type;
                    dateCell.textContent = dayjs(updatedTransaction.date).local().format('DD/MM/YYYY');
  
                    // Réafficher le bouton Modifier et cacher le bouton Sauvegarder
                    editBtn.style.display = "inline";
                    saveBtn.remove();
                    cancelBtn.remove();
                    fetchTransactions();

                    //Log pour sauvegarde
                    console.log("Transaction modifiée avec succès: ", updatedTransaction);
                  })
                  .catch(error => alert(error.message));
                }
              });
  
              // Ajouter un bouton Annuler
              let cancelBtn = document.createElement("button");
              cancelBtn.setAttribute("class", "button-add-transac");
              cancelBtn.textContent = "Annuler";
              actionCell.appendChild(cancelBtn);

              const cancelEdit = () => {
                catCell.textContent = transaction.categorie;
                descCell.textContent = transaction.description;
                montantCell.textContent = transaction.montant.toFixed(2) + " €";
                typeCell.textContent = transaction.type;
                dateCell.textContent = dayjs(transaction.date).format('DD/MM/YYYY');
  
                editBtn.style.display = "inline";
                saveBtn.remove();
                cancelBtn.remove()

                //Supp ecouteur "esc" après annulation 
                document.removeEventListener("keydown", escHandler);

              };

              //Gestionnaire de touche Escape 
              const escHandler = (e) => {
                if (e.key === "Escape") {
                  cancelEdit();
                }
              }

              document.addEventListener("keydown", escHandler);
  
              cancelBtn.addEventListener("click", cancelEdit);

            });

  
            actionCell.appendChild(editBtn);
  
            // Bouton Supprimer
            let deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "button-add-transac");
            deleteBtn.textContent = "Supprimer";
            deleteBtn.addEventListener("click", () => {
              if (confirm("Êtes-vous sûr de vouloir supprimer cette transaction ?")) {
                fetch(`/transactions/${transaction._id}`, { method: 'DELETE' })
                  .then(() => { 
                    row.remove(); });  // Retirer la ligne du tableau

                    //Log post suppression
                    console.log("Transaction supprimée avec succès: ", transaction._id);
              }
            });
            actionCell.appendChild(deleteBtn);
  
            row.appendChild(actionCell);
            transacList.appendChild(row);
          });
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        alert('Erreur lors de la récupération des transactions.');
      }
    };
  
    // Récupérer les transactions dès que l'utilisateur sélectionne un filtre
    filterSelect.addEventListener('change', (event) => {
      const selectedFilter = event.target.value;
      fetchTransactions(selectedFilter);  // Filtrer selon la sélection de l'utilisateur
    });
  
    // Appel initial pour récupérer les transactions
    fetchTransactions('currentMonth');
  });
  