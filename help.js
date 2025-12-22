async function createHelp() {
  const name = document.getElementById('userName').value.trim();
  const description = document.getElementById('helpDescription').value.trim();

  if (!name || !description) return showMessage('Fill all fields', 'red');

  try {
    const res = await fetch('/api/main', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });

    const data = await res.json();

    if (data.success) {
      showMessage('Thank you! Message submitted.', 'green');
      document.getElementById('helpForm').reset();
      await loadHelpData(); // refresh table
    } else {
      showMessage(data.error || 'Error submitting', 'red');
    }
  } catch (err) {
    showMessage('Network error', 'red');
    console.error(err);
  }
}

async function loadHelpData() {
  try {
    const data = await fetch('/api/main').then(res => res.json());
    const tableContainer = document.getElementById('helpTableContainer');

    if (!data || data.length === 0) {
      tableContainer.innerHTML = '<p>No messages yet.</p>';
      return;
    }

    let html = '<table><tr><th>Name</th><th>Description</th></tr>';
    data.forEach(item => {
      html += `<tr><td>${item.name}</td><td>${item.description}</td></tr>`;
    });
    html += '</table>';

    tableContainer.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
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
