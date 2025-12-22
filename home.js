document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const mealsContainer = document.getElementById('meals');
  const recipeDetails = document.getElementById('recipeDetails');
  const randomMealContainer = document.getElementById('randomMeal');
  const newRandomMealBtn = document.getElementById('newRandomMealBtn');
  const mealsSection = document.getElementById('meals-section');
  const recipeSection = document.getElementById('recipe-section');
  const randomMealSection = document.getElementById('random-meal-section'); // wrapper section


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
          </div>
        `;
      });
  }

  if (randomMealContainer) {
    loadRandomMeal();
    if (newRandomMealBtn) newRandomMealBtn.addEventListener('click', loadRandomMeal);
  }


  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (!query) {
        alert('Enter a meal name!');
        return;
      }


      if (randomMealSection) {
        randomMealSection.style.display = 'none';
      }

      mealsSection.style.display = 'block';
      recipeSection.style.display = 'none';

      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
    });
  }


  function displayMeals(meals) {
    mealsContainer.innerHTML = '';
    recipeDetails.innerHTML = '';
    recipeSection.style.display = 'none';

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
        </div>`;
    });

    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        recipeSection.style.display = 'block';
        viewRecipe(btn.dataset.id);
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
          <p>${meal.strInstructions}</p>`;
      });
  }
});
