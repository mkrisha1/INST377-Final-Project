document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const mealsContainer = document.getElementById('meals');
  const recipeDetails = document.getElementById('recipeDetails');

  const mealsSection = document.getElementById('meals-section');
  const recipeSection = document.getElementById('recipe-section');
  const randomMealSection = document.getElementById('random-meal-section');

  const randomMealContainer = document.getElementById('randomMeal');
  const newRandomMealBtn = document.getElementById('newRandomMealBtn');

 
  if (randomMealContainer) {
    loadRandomMeal();

    if (newRandomMealBtn) {
      newRandomMealBtn.addEventListener('click', loadRandomMeal);
    }
  }

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
      })
      .catch(() => {
        randomMealContainer.innerHTML = '<p>Failed to load meal.</p>';
      });
  }

 
  if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    if (!query) {
      alert('Enter a meal name!');
      return;
    }

    // hides random meal after search
    if (randomMealSection) {
      randomMealSection.style.display = 'none';
    }

    if (mealsSection) mealsSection.style.display = 'block';
    if (recipeSection) recipeSection.style.display = 'none';

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => displayMeals(data.meals));
  });
}

    categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
    if (!category) return;

    if (mealsSection) mealsSection.style.display = 'block';
    if (recipeSection) recipeSection.style.display = 'none';

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
          <button data-id="${meal.idMeal}">View Recipe</button>
        </div>
      `;
    });

    document.querySelectorAll('.meal-card button').forEach(btn => {
      btn.addEventListener('click', () => {
        recipeSection.style.display = 'block';
        loadRecipe(btn.dataset.id);
      });
    });
  }

 
  function loadRecipe(mealID) {
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
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <button data-id="${meal.idMeal}">View Recipe</button>
        </div>`;
  });

  document.querySelectorAll('.meal-card button').forEach(btn => {
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
          <img src="${meal.strMealThumb}">
          <p>${meal.strInstructions}</p>`;
      });
  }

});
