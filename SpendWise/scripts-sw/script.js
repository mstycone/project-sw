// script.js
let transactions = [];

document.getElementById('transac-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const description = document.getElementById('categorie').value;
  const amount = parseFloat(document.getElementById('montant').value);
  const type = document.getElementById('type').value;

  const transaction = {
    description,
    amount: type === 'revenue' ? amount : -amount,
    type,
  };

  transactions.push(transaction);
  updateBalance();
  addTransactionToTable(transaction);
});

function updateBalance() {
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  document.getElementById('balance').innerText = `${balance} €`;
}

function addTransactionToTable(transaction) {
  const tableBody = document.getElementById('transac-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${transaction.description}</td>
    <td>${transaction.amount} €</td>
    <td>${transaction.type}</td>
  `;
  tableBody.appendChild(row);
}

