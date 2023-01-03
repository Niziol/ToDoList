let todoInput,
	errorInfo,
	addBtn,
	ulList,
	popup,
	popupInput,
	popupInfo,
	popupEditedTodo,
	popupAcceptBtn,
	popupCancelBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todo ul');
	popup = document.querySelector('.popup');
	popupInput = document.querySelector('.popup-input');
	popupInfo = document.querySelector('.popup-info');
	popupAcceptBtn = document.querySelector('.popup-btn.accept');
	popupCancelBtn = document.querySelector('.popup-btn.cancel');
};

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNeWTask);
	document.addEventListener('keypress', enterKeyCheck);
	ulList.addEventListener('click', checkClick);
	popupCancelBtn.addEventListener('click', closePopup);
	popupAcceptBtn.addEventListener('click', saveChangesPopup);
};

const updateErrorInfo = (msg) => {
	errorInfo.textContent = msg;
};

const createToolsArea = () => {
	const buttonComplete = document.createElement('button');
	buttonComplete.classList.add('complete');

	const iconCheck = document.createElement('i');
	iconCheck.classList.add('fas', 'fa-check');
	buttonComplete.append(iconCheck);

	const buttonEdit = document.createElement('button');
	buttonEdit.classList.add('edit');
	buttonEdit.textContent = 'EDIT';

	const buttonDelete = document.createElement('button');
	buttonDelete.classList.add('delete');

	const iconDelete = document.createElement('i');
	iconDelete.classList.add('fas', 'fa-times');
	buttonDelete.append(iconDelete);

	const divTools = document.createElement('div');
	divTools.classList.add('tools');
	divTools.append(buttonComplete, buttonEdit, buttonDelete);

	return divTools;
};

const createLiElement = () => {
	const li = document.createElement('li');
	li.textContent = todoInput.value;

	const divTools = createToolsArea();
	li.append(divTools);

	return li;
};

const addNeWTask = () => {
	if (todoInput.value === '') {
		updateErrorInfo('Wpisz treść zadania!');
		return;
	}

	const li = createLiElement();

	ulList.append(li);
	updateErrorInfo('');
	todoInput.value = '';
};

const completeTodo = (element) => {
	element.closest('li').classList.toggle('completed');
	element.classList.toggle('completed');
};

const editPopup = (element) => {
	popupEditedTodo = element.closest('li');
	popupInput.value = popupEditedTodo.firstChild.textContent;
	popup.style.display = 'flex';
};

const saveChangesPopup = () => {
	if (popupInput.value === '') {
		popupInfo.textContent = 'Musisz podać jakąś treść!';
		return;
	}

	popupEditedTodo.firstChild.textContent = popupInput.value;

	popupInfo.textContent = '';
	closePopup();
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const deleteTodo = (element) => {
	element.closest('li').remove();

	const allTodos = ulList.querySelectorAll('li');
	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście.';
	}
};

const checkClick = (e) => {
	const element = e.target;
	if (element.matches('.complete')) {
		completeTodo(element);
	} else if (element.matches('.edit')) {
		editPopup(element);
	} else if (element.matches('.delete')) {
		deleteTodo(element);
	}
};

const enterKeyCheck = (e) => {
	if (e.key === 'Enter') addNeWTask();
};

document.addEventListener('DOMContentLoaded', main);
