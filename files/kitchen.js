const API_URL = '/api/shopping-list';

let items = [];
const listElement = document.getElementById('shoppingList');
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');

const sortable = new Sortable(listElement, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: function(evt) {
        const movedItem = items.splice(evt.oldIndex, 1)[0];
        items.splice(evt.newIndex, 0, movedItem);
        saveToBackend();
    }
});

function renderList() {
    if (items.length === 0) {
        showEmptyState();
        return;
    }

    listElement.innerHTML = items.map((item, index) => `
        <li class="list-item" data-index="${index}">
            <div class="item-content">
                <span class="drag-handle">☰</span>
                <span class="item-text">${escapeHtml(item)}</span>
            </div>
            <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
        </li>
    `).join('');

    updateCount();
}

function showEmptyState() {
    listElement.innerHTML = `
        <div class="empty-state">
            <p>Your shopping list is empty</p>
        </div>
    `;
    updateCount();
}


function addItem() {
    const newItem = itemInput.value.trim();
    if (newItem) {
        items.push(newItem);
        itemInput.value = '';
        renderList();
        saveToBackend();
    }
}

function deleteItem(index) {
    items.splice(index, 1);
    renderList();
    saveToBackend();
}


function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

loadItems();