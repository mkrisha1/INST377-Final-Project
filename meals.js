document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const mealsContainer = document.getElementById('meals');
  const recipeDetails = document.getElementById('recipeDetails');

 
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      data.categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.strCategory;
        option.textContent = cat.strCategory;
        categorySelect.appendChild(option);
      });
    });


  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) {
      alert('Please enter a meal name');
      return;
    }

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
      const div = document.createElement('div');
      div.className = 'meal-card';
      div.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button data-id="${meal.idMeal}">View Recipe</button>
      `;
      mealsContainer.appendChild(div);
    });

    
    document.querySelectorAll('.meal-card button').forEach(btn => {
      btn.addEventListener('click', () => {
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
          <p>${meal.strInstructions}</p>
        `;
      });
  }
});
