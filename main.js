const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');
const addTransaction = document.querySelector('.add-transaction');
const addTransactionPanel = document.querySelector('.add-transaction-panel');
const cancelBtn = document.querySelector('.cancel');
const saveBtn = document.querySelector('.save');
const deleteBtn = document.querySelector('.delete');
const transactionName = document.querySelector('#name');
const transactionAmount = document.querySelector('#amount');
const error = document.querySelector('.error');
const category = document.querySelector('#category');
const availableMoney = document.querySelector('.available-money');

let ID = 0;
let newName;
let newAmount;
let categoryIcon;
const moneyArr = [0];
let selectedCategory;
let sumAvailableMoney = 0;

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

const createNewTransaction = () => {
	newTransactionDate();
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', ID);
	checkIcon(selectedCategory);
	newTransaction.innerHTML = `
    <p class="transaction-name">
	${categoryIcon} ${newName} </p>
	<p class="transaction-amount"> ${newAmount} zł<button class="delete"><i class="fas fa-times"></i></button></p>
	</div>`;
	newAmount > 0
		? incomeArea.appendChild(newTransaction) &&
		  newTransaction.classList.add('income')
		: expensesArea.appendChild(newTransaction) &&
		  newTransaction.classList.add('expense');
	moneyArr.push(parseFloat(newAmount));
	countMoney(moneyArr);
	
	ID++;
};

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
const countMoney = () => {
	const newMoney = money.reduce((a,b)=>a+b);
		availableMoney.textContent = `${newMoney} zł`
	
};

const newTransactionDate = () => {
	newName = transactionName.value;
	newAmount = transactionAmount.value;
};
const transactionDateClear = () => {
	newName = transactionName.value = '';
	newAmount = transactionAmount.value = '';
	category.value = 'none';
};

//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
const showPanel = () => {
	addTransactionPanel.style.display = 'flex';
};
const closePanel = () => {
	addTransactionPanel.style.display = 'none';
	transactionDateClear();
};
//////////////////////////////////////////////////////

addTransaction.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', closePanel);

saveBtn.addEventListener('click', addNewTransaction);
