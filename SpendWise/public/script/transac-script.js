document.addEventListener("DOMContentLoaded", () => {
    fetch('/transactions')  // Récupérer toutes les transactions du backend
    .then(response => response.json())
    .then(transactions => {

      let transacList = document.getElementById("transac-list");

      if (transactions.length === 0) {
        let emptyRow = document.createElement("tr");
        let emptyCell = document.createElement("td");
        emptyCell.setAttribute("colspan", 5); // Fusionne les colonnes
        emptyCell.textContent = "Aucune transaction à afficher";
        emptyRow.appendChild(emptyCell);
        transacList.appendChild(emptyRow);
      }else {
        transactions.forEach((transaction, index) => {
            let row = document.createElement("tr");

            let descCell = document.createElement("td");
            descCell.textContent = transaction.categorie;
            row.appendChild(descCell);

              let montantCell = document.createElement("td");
              montantCell.textContent = transaction.montant.toFixed(2) + " €";
              row.appendChild(montantCell);

              let typeCell = document.createElement("td");
              typeCell.textContent = transaction.type;
              row.appendChild(typeCell);

              let dateCell = document.createElement("td");
              dateCell.textContent = transaction.date; // Utilisation du champ virtuel "formatted_date"
              row.appendChild(dateCell);

              // Ajouter les boutons de modification et suppression
              let actionCell = document.createElement("td");

              let editBtn = document.createElement("button");
              // Bouton Modifier
              editBtn.setAttribute("class", "button-add-transac");
              editBtn.textContent = "Modifier";
              editBtn.addEventListener("click", () => {
                // Remplacer les cellules par des champs de saisie pour modification
                descCell.innerHTML = `<input type="text" value="${transaction.categorie}" id="edit-categorie-${index}">`;
                montantCell.innerHTML = `<input type="number" value="${transaction.montant}" id="edit-montant-${index}">`;
                typeCell.innerHTML = `
                  <select id="edit-type-${index}">
                    <option value="revenu" ${transaction.type === 'revenu' ? 'selected' : ''}>Revenu</option>
                    <option value="depense" ${transaction.type === 'depense' ? 'selected' : ''}>Dépense</option>
                  </select>`;
                dateCell.innerHTML = `<input type="date" id="edit-date-${index}" value="${transaction.date.split('T')[0]}">`; // Format "YYYY-MM-DD"

                // Remplacer le bouton Modifier par un bouton Sauvegarder
                editBtn.style.display = "none"; // Cacher le bouton Modifier
                let saveBtn = document.createElement("button");
                saveBtn.setAttribute("class", "button-add-transac");
                saveBtn.textContent = "Sauvegarder";
                actionCell.appendChild(saveBtn);

                saveBtn.addEventListener("click", () => {
                  //Demande de confirmation avant action (booléen)
                  if (confirm("Voulez-vous sauvegarder les modifications ?")) {
                    // Récupérer les nouvelles valeurs des champs dans la bdd
                    const updatedTransaction = {
                      categorie: document.getElementById(`edit-categorie-${index}`).value,
                      montant: parseFloat(document.getElementById(`edit-montant-${index}`).value),
                      type: document.getElementById(`edit-type-${index}`).value,
                      date: document.getElementById(`edit-date-${index}`).value,
                    };

                    //Envoyer la requete put pour modifier les transactions 
                    fetch(`/transactions/${transaction._id}`, {
                      method: 'PUT',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify(updatedTransaction)
                    })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error(`Erreur lors de l'update de la transaction : ${response.statusText}`);
                        }
                        return response.json();
                      })
                      .then(data => {
                       // Mettre à jour l'affichage de la transaction
                        descCell.textContent = updatedTransaction.categorie;
                        montantCell.textContent = updatedTransaction.montant.toFixed(2) + " €";
                        typeCell.textContent = updatedTransaction.type;
                        dateCell.textContent = updatedTransaction.date.split('T')[0]; // Format "YYYY-MM-DD"

                        // Réafficher le bouton Modifier et cacher le bouton Sauvegarder
                        editBtn.style.display = "inline";
                        saveBtn.remove();
                      })
                      .catch(error => alert(error.message));
                  }
                });

                //Ajout un bouton 'Annuler'
                let cancelBtn = document.createElement("button");
                cancelBtn.setAttribute("class", "button-add-transac");
                cancelBtn.textContent = "Annuler";
                actionCell.appendChild(cancelBtn);

                //Reprend les valeurs de bases 
                cancelBtn.addEventListener("click", () => {
                  descCell.innerHTML = transaction.categorie; 
                  montantCell.innerHTML = transaction.montant.toFixed(2) + " €";
                  typeCell.innerHTML = transaction.type;
                  dateCell.innerHTML = transaction.date.split('T')[0];

                  //Réafficher les boutons de départ 
                  editBtn.style.display = "inline";
                  saveBtn.remove();
                  cancelBtn.remove();
                });
              });
              actionCell.appendChild(editBtn);

              // Bouton Supprimer
              let deleteBtn = document.createElement("button");
              deleteBtn.setAttribute("class", "button-add-transac");
              deleteBtn.textContent = "Supprimer";
              deleteBtn.addEventListener("click", () => {
                //Demande de confirmation avant action (booléen)
                if (confirm("Êtes-vous sûr de vouloir supprimer cette transaction ?")) {
                  fetch(`/transactions/${transaction._id}`, {
                    method: 'DELETE'
                  })
                  .then(() => { row.remove();}); //Retirer la ligne du tableau
                }
              });
              actionCell.appendChild(deleteBtn);

              row.appendChild(actionCell);
              transacList.appendChild(row);
          });
      }
    });
  });