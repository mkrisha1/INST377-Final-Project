const API_URL = '/api/shopping-list';

let items = [];
const listElement = document.getElementById('shoppingList');
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');

let sortable = null;

function initSortableOnce() {
  if (sortable) return;

  sortable = new Sortable(listElement, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    draggable: 'li',
    filter: '.delete-btn',
    onEnd: () => {
      items = Array.from(listElement.querySelectorAll('li .item-text'))
        .map(el => el.textContent);

      
    }
  });
}

function renderList() {
  listElement.innerHTML = items.map((item, index) => `
    <li class="list-item">
      <div class="item-content">
        <span class="drag-handle">☰</span>
        <span class="item-text">${escapeHtml(item)}</span>
      </div>
      <button class="delete-btn" type="button" onclick="deleteItem(${index})">Delete</button>
    </li>
  `).join('');
  initSortableOnce();
}

function addItem() {
  const newItem = itemInput.value.trim();
  if (!newItem) return;

  items.push(newItem);
  itemInput.value = '';
  renderList();
}

function deleteItem(index) {
  items.splice(index, 1);
  renderList();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addItem();
});


initSortableOnce();
