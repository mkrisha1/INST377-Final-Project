async function createHelp() {
  const name = document.getElementById('userName').value.trim();
  const description = document.getElementById('helpDescription').value.trim();
  if (!name || !description) return showMessage('Fill all fields', 'red');

  await fetch('/api/help', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  })
    .then(res => res.json())
    .then(() => {
      showMessage('Thank you! Message submitted.', 'green');
      document.getElementById('helpForm').reset();
      loadHelpData();
    });
}

async function loadHelpData() {
  const tableContainer = document.getElementById('helpTableContainer');
  const data = await fetch('/api/help').then(res => res.json());
  let html = '<table><tr><th>Name</th><th>Description</th></tr>';
  data.forEach(item => html += `<tr><td>${item.name}</td><td>${item.description}</td></tr>`);
  html += '</table>';
  tableContainer.innerHTML = html;
}

function showMessage(msg, color) {
  const el = document.getElementById('helpMessage');
  el.textContent = msg;
  el.style.color = color;
}

document.getElementById('helpForm').addEventListener('submit', e => {
  e.preventDefault();
  createHelp();
});

window.onload = loadHelpData;
