const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel');
const transactionName = document.querySelector('#name');
const transactionAmount = document.querySelector('#amount');
const category = document.querySelector('#category');
const addTransactionBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');
const error = document.querySelector('.error');
const transactionList = document.querySelector('.transaction-list');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');
let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];
let sumAvailableMoney = 0;
let incomeToDelete;
let expenseToDelete;
//////////////////////////////////////////////////////
const showPanel = () => {
	addTransactionPanel.style.display = 'flex';
};
const closePanel = () => {
	addTransactionPanel.style.display = 'none';
	transactionDateClear();
};
//////////////////////////////////////////////////////
const addNewTransaction = () => {
	if (
		transactionName.value !== '' &&
		transactionAmount.value !== '' &&
		category !== 'none'
	) {
		createNewTransaction();
		error.textContent = '';
		transactionDateClear();
		closePanel();
	} else {
		error.textContent = 'Musisz uzupełnić wszystkie pola';
	}
};
const transactionDateClear = () => {
	transactionName.value = '';
	transactionAmount.value = '';
	category.value = 0;
};
//////////////////////////////////////////////////////
const createNewTransaction = () => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', ID);
	checkIcon(selectedCategory);
	newTransaction.innerHTML = `
    <p class="transaction-name">
	${categoryIcon} ${transactionName.value} </p>
	<p class="transaction-amount"> ${transactionAmount.value} zł<button class="delete" onclick = 'deleteTransaction(${ID})'><i class="fas fa-times"></i></button></p>
	</div>`;
	if (transactionAmount.value > 0) {
		incomeArea.appendChild(newTransaction);
		newTransaction.classList.add('income');
	} else {
		expensesArea.appendChild(newTransaction);
		newTransaction.classList.add('.expense');
	}
	moneyArr.push(parseFloat(transactionAmount.value));
	countMoney(moneyArr);
	ID++;
};
//////////////////////////////////////////////////////
const selectetCategory = () => {
	selectedCategory = category.options[category.selectedIndex].text;
};
const checkIcon = (transaction) => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
		case '[ - ] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="fas fa-hamburger"></i>';
			break;
		case '[ - ] Kino':
			categoryIcon = '<i class="fas fa-film"></i>';
			break;
	}
};
//////////////////////////////////////////////////////
const countMoney = (money) => {
	const newMoney = money.reduce((a, b) => a + b);
	availableMoney.textContent = `${newMoney} zł`;
};
//////////////////////////////////////////////////////
const deleteTransaction = (id) => {
	const transactionToDelete = document.getElementById(id);
	const amountValue = parseFloat(transactionToDelete.childNodes[3].innerText);
	const indexOfTransaction = moneyArr.indexOf(amountValue);
	moneyArr.splice(indexOfTransaction, 1);

	if (transactionToDelete.classList.contains('income')) {
		incomeArea.removeChild(transactionToDelete);
	} else {
		expensesArea.removeChild(transactionToDelete);
	}
	countMoney(moneyArr);
};
//////////////////////////////////////////////////////

const deleteAllTransaction = () => {
	incomeArea.innerHTML = '<h3>Przychód:</h3>';
	expensesArea.innerHTML = '<h3>Wydatki:</h3>';
	availableMoney.textContent = '0 zł';
	moneyArr = [0];
};
//////////////////////////////////////////////////////
gaddTransactionBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', closePanel);

saveBtn.addEventListener('click', addNewTransaction);
deleteAllBtn.addEventListener('click', deleteAllTransaction);

lightBtn.addEventListener('click', () => {
	root.style.setProperty('--first-color', `#f9f9f9`);
	root.style.setProperty('--second-color', `#14161f`);
	root.style.setProperty('--border-color', `rgba(0, 0, 0, 0.2)`);
});
darkBtn.addEventListener('click', () => {
	root.style.setProperty('--first-color', `#14161f`);
	root.style.setProperty('--second-color', `#f9f9f9`);
	root.style.setProperty('--border-color', `#f9f9f9`);
});
