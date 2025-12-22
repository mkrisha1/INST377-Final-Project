document.addEventListener('DOMContentLoaded', () => {
  const favoritesContainer = document.getElementById('favorites');

  async function loadFavorites() {
    favoritesContainer.innerHTML = '<p>Loading favorites...</p>';
    try {
      const res = await fetch('http://localhost:3000/favorites');
      const data = await res.json();

      if (!data || data.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorites yet.</p>';
        return;
      }

      favoritesContainer.innerHTML = '';
      data.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('meal-card');
        div.innerHTML = `
          <img src="${meal.meal_thumb}" alt="${meal.meal_name}">
          <h3>${meal.meal_name}</h3>
          <button class="remove-btn" data-id="${meal.meal_id}">Remove</button>
        `;
        favoritesContainer.appendChild(div);
      });

      document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await fetch(`http://localhost:3000/favorites/${btn.dataset.id}`, {
            method: 'DELETE'
          });
          loadFavorites();
        });
      });
    } catch (err) {
      favoritesContainer.innerHTML = '<p>Failed to load favorites.</p>';
      console.error(err);
    }
  }

  loadFavorites();
});
