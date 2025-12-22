document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const mealsContainer = document.getElementById('meals');
  const recipeDetails = document.getElementById('recipeDetails');
  const randomMealContainer = document.getElementById('randomMeal');
  const newRandomMealBtn = document.getElementById('newRandomMealBtn');

  function loadRandomMeal() {
    randomMealContainer.innerHTML = '<p>Loading...</p>';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
        randomMealContainer.innerHTML = `
          <div class="random-meal-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strInstructions.slice(0, 150)}...</p>
            <button class="fav-btn"
              data-id="${meal.idMeal}"
              data-name="${meal.strMeal}"
              data-thumb="${meal.strMealThumb}">
              Save Favorite
            </button>
          </div>
        `;

        document.querySelector('.fav-btn').addEventListener('click', () => {
          saveFavorite({
            meal_id: meal.idMeal,
            meal_name: meal.strMeal,
            meal_thumb: meal.strMealThumb
          });
        });
      });
  }

  if (randomMealContainer) {
    loadRandomMeal();
    if (newRandomMealBtn) newRandomMealBtn.addEventListener('click', loadRandomMeal);
  }


  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) return alert('Enter a meal name!');

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => displayMeals(data.meals));
  });

 
  categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
    if (!category) return;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => displayMeals(data.meals));
  });


  function displayMeals(meals) {
    mealsContainer.innerHTML = '';
    recipeDetails.innerHTML = '';

    if (!meals) {
      mealsContainer.innerHTML = '<p>No meals found.</p>';
      return;
    }

    meals.forEach(meal => {
      mealsContainer.innerHTML += `
        <div class="meal-card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <button class="view-btn" data-id="${meal.idMeal}">View Recipe</button>
          <button class="fav-btn"
            data-id="${meal.idMeal}"
            data-name="${meal.strMeal}"
            data-thumb="${meal.strMealThumb}">
            Save Favorite
          </button>
        </div>
      `;
    });

    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => viewRecipe(btn.dataset.id));
    });

    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        saveFavorite({
          meal_id: btn.dataset.id,
          meal_name: btn.dataset.name,
          meal_thumb: btn.dataset.thumb
        });
      });
    });
  }


  function viewRecipe(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
        recipeDetails.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p>${meal.strInstructions}</p>
        `;
      });
  }


  function saveFavorite(meal) {
  fetch('http://localhost:3000/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meal)
  })
    .then(res => res.json())
    .then(() => alert('Saved to favorites!'))
    .catch(err => console.error('Error saving favorite:', err));
}


});
